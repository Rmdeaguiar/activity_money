import './styles.scss';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import IncomeCard from '../../components/IncomeCard';
import TableCard from '../../components/TableCard';
import ModalTransaction from '../../components/ModalTransaction';
import Header from '../../components/Header';
import { useModal } from '../../stores/modalStore';
import { StoresProvider } from '../../stores';

function Home() {

  const token = getItem('token');
  const { loadIncome, credit, debit, transactions } = useModal();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if(token) loadIncome(token!);
  }, [transactions]);


  return (
    <>
      <Header />
      <div className="container-home">
        <button onClick={() => setModal(true)}>Nova transação</button>
        <div className='cards-home'>
          <IncomeCard
            title='Entradas'
            value={credit}
          />
          <IncomeCard
            title='Saídas'
            value={debit}
          />
          <IncomeCard
            title='Total'
            value={credit - debit}
          />
        </div>
        <div className='table-home'>
          <TableCard
            transactions={transactions}
          />
        </div>
        {modal &&
          <StoresProvider>
            <ModalTransaction
              modalType='Nova transação'
              modal={modal}
              setModal={setModal}
              transaction={{
                transaction_id: 0,
                transaction_date: '',
                transaction_title: '',
                transaction_type: '',
                transaction_value: 0
              }}
            />
          </StoresProvider>
        }
      </div>
    </>

  );
}

export default Home;