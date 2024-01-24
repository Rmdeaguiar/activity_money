import './styles.scss';
import { Dispatch, SetStateAction } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";


type ModalProps = {
  modal: boolean,
  setModal: Dispatch<SetStateAction<boolean>>
}

function ModalTransaction({ modal, setModal }: ModalProps) {
  return (
    <div className="container-modal">
      <h2>Nova transação</h2>
      <div className='close-icon'>
        <IoCloseCircleOutline size={25} onClick={()=>setModal(false)} />
      </div>
      <form>
        <label htmlFor='title'>Título</label>
        <input name='title' type='text' />
        <label htmlFor='value'>Valor</label>
        <input name='value' type='number' />
        <label htmlFor='date'>Data</label>
        <input name='date' type='date' />
        <div className='form-buttons'>
          <button className='green-btn'>Confirmar</button>
          <button className='red-btn'>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalTransaction;