import './styles.scss';
import { useState, useEffect, Dispatch } from 'react';
import { Transaction } from '../../types/Transaction';
import { format } from 'date-fns';
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { FaFilterCircleDollar, FaFilterCircleXmark } from "react-icons/fa6";
import { TbFilterCancel } from "react-icons/tb";
import ModalTransaction from '../ModalTransaction';
import ModalDelete from '../ModalDelete';

interface TableCardProps {
  transactions: Transaction[];
}

function TableCard({ transactions }: TableCardProps) {
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState(false);
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

  const handleCreditTransactions = (transactions: Transaction[]) => {
    setFilter(true);
    const creditTransactions = transactions.filter(local => local.transaction_type === 'entrada');
    setLocalTransactions(creditTransactions);

  }

  const handleDebitTransactions = (transactions: Transaction[]) => {
    setFilter(true);
    const debitTransactions = transactions.filter(local => local.transaction_type === 'saída');
    setLocalTransactions(debitTransactions);
  }

  const handleClearFilters = (transactions: Transaction[]) => {
    setFilter(false);
    setLocalTransactions(transactions);
  }

  const renderTransactionTable = (transaction: Transaction) => (
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
  );

  return (
    <div className="table-card">
      <div className='filter-icons'>
        <FaFilterCircleDollar color='green' size={20} cursor={'pointer'} onClick={() => handleCreditTransactions(transactions)} />
        <FaFilterCircleXmark color='red' size={20} cursor={'pointer'} onClick={() => handleDebitTransactions(transactions)}/>
        <TbFilterCancel color='white' size={20} cursor={'pointer'} onClick={() => handleClearFilters(transactions)}/>
      </div>
      <thead className='header-table'>
        <th>Título</th>
        <th>Valor</th>
        <th>Data</th>
      </thead>
      {filter ? localTransactions.map(renderTransactionTable) : transactions.map(renderTransactionTable)}
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