import './styles.scss';
import { Dispatch, SetStateAction } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FormEvent, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage';

type ModalProps = {
  modalType: string
  modal: boolean,
  setModal: Dispatch<SetStateAction<boolean>>
}

function ModalTransaction({ modalType, modal, setModal }: ModalProps) {
  const token = getItem('token');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleTransaction = async (e: FormEvent) => {
    e.preventDefault();

    if (modalType === 'Nova transação') {
      const response = await api.post('/transaction', {
        value: amount,
        date,
        type: selectedOption,
        title
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

    } else {

    }

  }

  const handleClearForm = () => {
    setTitle('');
    setAmount(0);
    setDate('');
    setSelectedOption('');
  }

  return (
    <div className="container-modal">
      <h2>{modalType}</h2>
      <div className='close-icon'>
        <IoCloseCircleOutline size={25} onClick={() => setModal(false)} />
      </div>
      <form onSubmit={handleTransaction}>
        <label htmlFor='title'>Título</label>
        <input name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor='value'>Valor</label>
        <input name='value' type='number' value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <label htmlFor='date'>Data</label>
        <input name='date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
        <div className='form-check'>
          <label htmlFor='type-income'>Entrada</label>
          <input name='type-income' value='entrada' type='radio' checked={selectedOption === 'entrada'} onChange={(e) => setSelectedOption(e.target.value)} />
          <label htmlFor='type-income'>Saída</label>
          <input name='type-income' value='saída' type='radio' checked={selectedOption === 'saída'} onChange={(e) => setSelectedOption(e.target.value)} />
        </div>
        <div className='form-buttons'>
          <button className='green-btn'>Confirmar</button>
          <button type='button' className='red-btn' onClick={() => handleClearForm()}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalTransaction;