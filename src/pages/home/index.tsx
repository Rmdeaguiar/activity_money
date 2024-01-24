import React from 'react';
import './styles.scss';
import IncomeCard from '../../components/IncomeCard';
import TableCard from '../../components/TableCard';

function Home() {
  return (
    <div className="container-home">
      <div className='cards-home'>
        <IncomeCard
          title='Entradas'
          value={100}
        />
        <IncomeCard
          title='Saídas'
          value={50}
        />
        <IncomeCard
          title='Total'
          value={50}
        />
      </div>
      <div className='table-home'>
        <TableCard />
      </div>
    </div>
  );
}

export default Home;