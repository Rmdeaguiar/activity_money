import './styles.scss';
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import ModalTransaction from '../ModalTransaction';
import { useState } from 'react';

function TableCard() {

  const [modal, setModal] = useState(false);

  return (
    <div className="table-card">
      <thead className='header-table'>
        <th>Título</th>
        <th>Valor</th>
        <th>Data</th>
      </thead>
      <tbody className='main-table'>
        <tr>Entrada</tr>
        <tr>{(200000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</tr>
        <tr>24/01/2024</tr>
        <div className='table-icons'>
          <div className='table-icon'>
            <GoPencil size={15} onClick={() => setModal(true)} />
          </div>
          <div className='table-icon'>
            <FaTrashAlt size={15} />
          </div>
        </div>
      </tbody>
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