import './styles.scss';
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import ModalTransaction from '../ModalTransaction';
import { useState } from 'react';
import { Transaction } from '../../types/Transaction';
import { format } from 'date-fns';
import ModalDelete from '../ModalDelete';

interface TableCardProps {
  transactions: Transaction[];
}

function TableCard({ transactions }: TableCardProps) {

  const [currentTransaction, setCurrentTransaction] = useState<number | null>(null)
  const [modal, setModal] = useState(false);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>({
    transaction_id: 0,
    transaction_date: '',
    transaction_title: '',
    transaction_type: '',
    transaction_value: 0
  })

  const handleOpenModalDelete = (index: number) => {
    setModalIndex(index);
    setModalDelete(true);
    setCurrentTransaction(index);
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setModal(true);
    setTransaction(transaction);
  }


  return (
    <div className="table-card">
      <thead className='header-table'>
        <th>Título</th>
        <th>Valor</th>
        <th>Data</th>
      </thead>
      {transactions.map((transaction: Transaction) => (
        <div key={transaction.transaction_id} className={`${transaction.transaction_type === 'entrada' ? 'main-table green' : 'main-table red'}`}>
          <tr>{transaction.transaction_title ?? 'Sem título'}</tr>
          <tr>{(transaction.transaction_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</tr>
          <tr>{format(new Date(transaction.transaction_date), "dd/MM/yyyy")}</tr>
          <div className='table-icons'>
            <div className='table-icon'>
              <GoPencil size={15} onClick={() => handleEditTransaction(transaction)} />
            </div>
            <div className='table-icon'>
              <FaTrashAlt size={15} onClick={() => handleOpenModalDelete(transaction.transaction_id)} />
              {modalDelete && transaction.transaction_id === currentTransaction &&
                <ModalDelete
                  modalIndex={modalIndex}
                  setModalDelete={setModalDelete}
                />
              }
            </div>
          </div>
        </div>
      ))}
      {modal &&
        <ModalTransaction
          modalType='Editar transação'
          modal={modal}
          setModal={setModal}
          transaction={transaction}
        />
      }

    </div>
  );
}

export default TableCard;