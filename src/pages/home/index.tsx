import './styles.scss';
import { useState } from 'react';
import IncomeCard from '../../components/IncomeCard';
import TableCard from '../../components/TableCard';
import ModalTransaction from '../../components/ModalTransaction';

function Home() {
  const [modal, setModal] = useState(false);

  return (
    <div className="container-home">
      <button onClick={() => setModal(true)}>Nova transação</button>
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
      {modal &&
        <ModalTransaction
          modal={modal}
          setModal={setModal}
        />
      }
    </div>
  );
}

export default Home;