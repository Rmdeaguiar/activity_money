import './styles.scss';
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import ModalTransaction from '../ModalTransaction';
import { useState } from 'react';
import { Transaction } from '../../types/Transaction';
import {format} from 'date-fns';

interface TableCardProps {
  transactions: Transaction[];
}

function TableCard({ transactions }: TableCardProps) {

  const [modal, setModal] = useState(false);

  return (
    <div className="table-card">
      <thead className='header-table'>
        <th>Título</th>
        <th>Valor</th>
        <th>Data</th>
      </thead>
      {transactions.map((transaction: Transaction) => (
        <div key={transaction.transaction_id} className='main-table'>
          <tr>{(transaction.transaction_type).toLocaleUpperCase()}</tr>
          <tr>{(transaction.transaction_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</tr>
          <tr>{format(new Date(transaction.transaction_date), "dd/MM/yyyy")}</tr>
          <div className='table-icons'>
            <div className='table-icon'>
              <GoPencil size={15} onClick={() => setModal(true)} />
            </div>
            <div className='table-icon'>
              <FaTrashAlt size={15} />
            </div>
          </div>
        </div>
      ))}

      {modal &&
        <ModalTransaction
          modalType='Editar transação'
          modal={modal}
          setModal={setModal}
        />
      }
    </div>
  );
}

export default TableCard;