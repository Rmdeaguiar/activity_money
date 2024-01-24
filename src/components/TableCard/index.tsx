import './styles.scss';

function TableCard() {

  return (
    <div className="table-card">
      <div className='header-table'>
        <h2>Título</h2>
        <h2>Valor</h2>
        <h2>Data</h2>
      </div>
      <div className='main-table'>
        <h3>Entrada</h3>
        <h3>{(200000).toLocaleString('pt-BR', {style:'currency', currency: 'BRL'})}</h3>
        <h3>24/01/2024</h3>
      </div>
    </div>
  );
}

export default TableCard;