import './styles.scss';
import { Dispatch, SetStateAction } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import { useModal } from '../../stores/modalStore';

type ModalDeleteProps = {
  modalIndex: number | null
  setModalDelete: Dispatch<SetStateAction<boolean>>
}

function ModalDelete({ modalIndex, setModalDelete }: ModalDeleteProps) {
  const token = getItem('token');

  const { loadIncome } = useModal();

  const handleDeleteTransaction = async () => {
    const response = await api.delete(`/transaction/${modalIndex}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    setModalDelete(false);
    loadIncome(token!)
  }

  return (
    <div className="container-delete">
      <h3>Tem certeza que deseja excluir esta transação?</h3>
      <div className='remove-btn'>
        <button className='green' onClick={() => handleDeleteTransaction()}>Sim</button>
        <button className='red' onClick={() => setModalDelete(false)}>Não</button>
      </div>
    </div>
  );
}

export default ModalDelete;