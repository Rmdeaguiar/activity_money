import './styles.scss';

function TableCard() {

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
      </tbody>
    </div>
  );
}

export default TableCard;