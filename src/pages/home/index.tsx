import './styles.scss';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import api from '../../services/api';
import IncomeCard from '../../components/IncomeCard';
import TableCard from '../../components/TableCard';
import ModalTransaction from '../../components/ModalTransaction';
import Header from '../../components/Header';
import { Transaction } from '../../types/Transaction';
import { useModal } from '../../stores/modalStore';
import { StoresProvider } from '../../stores';



function Home() {

  const { loadIncome, credit, debit, transactions } = useModal();

  const token = getItem('token');
  const [modal, setModal] = useState(false);
  // const [credit, setCredit] = useState(0);
  // const [debit, setDebit] = useState(0);
  // const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transaction, setTransaction] = useState<Transaction>()

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