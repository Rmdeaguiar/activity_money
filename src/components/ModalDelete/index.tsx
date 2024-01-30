import './styles.scss';

type ModalDeleteProps = {
  modalIndex: number | null
  modalDelete: boolean,
}

function ModalDelete() {

  return (
    <div className="container-delete">
      <h3>Tem certeza que deseja excluir esta transação?</h3>
      <div className='remove-btn'>
        <button className='green'>Sim</button>
        <button className='red'>Não</button>
      </div>
    </div>
  );
}

export default ModalDelete;