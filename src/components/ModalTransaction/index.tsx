import './styles.scss';
import { Dispatch, SetStateAction } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FormEvent, useState } from 'react';


type ModalProps = {
  modal: boolean,
  setModal: Dispatch<SetStateAction<boolean>>
}

function ModalTransaction({ modal, setModal }: ModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');

  const handleTransaction = async (e: FormEvent) => {
    e.preventDefault();
  }

  const handleClearForm = () => {
    setTitle('');
    setAmount(0);
    setDate('');
  }

  return (
    <div className="container-modal">
      <h2>Nova transação</h2>
      <div className='close-icon'>
        <IoCloseCircleOutline size={25} onClick={() => setModal(false)} />
      </div>
      <form onSubmit={handleTransaction}>
        <label htmlFor='title'>Título</label>
        <input name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor='value'>Valor</label>
        <input name='value' type='number' value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
        <label htmlFor='date'>Data</label>
        <input name='date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
        <div className='form-buttons'>
          <button className='green-btn'>Confirmar</button>
          <button type='button' className='red-btn' onClick={()=>handleClearForm()}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalTransaction;