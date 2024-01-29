import './styles.scss';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import api from '../../services/api';
import IncomeCard from '../../components/IncomeCard';
import TableCard from '../../components/TableCard';
import ModalTransaction from '../../components/ModalTransaction';
import Header from '../../components/Header';
import { Transaction } from '../../types/Transaction';

function Home() {
  const token = getItem('token');
  const [modal, setModal] = useState(false);
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function loadIncome() {
      const response = await api.get('/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

      const localIncomes = response.data;
      localIncomes.sort((a: Transaction, b: Transaction) => {
        return new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime();
      });

      setTransactions(localIncomes);

      const creditTotal = localIncomes.reduce((total: number, transaction: Transaction) => {
        if (transaction.transaction_type === 'entrada') {
          return total + transaction.transaction_value;
        }
        return total;
      }, 0);

      const debitTotal = localIncomes.reduce((total: number, transaction: Transaction) => {
        if (transaction.transaction_type === 'saída') {
          return total + transaction.transaction_value;
        }
        return total;
      }, 0);

      setCredit(creditTotal);
      setDebit(debitTotal);
    }

    loadIncome();

  }, []);


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
          <ModalTransaction
            modalType='Nova transação'
            modal={modal}
            setModal={setModal}
          />
        }
      </div>
    </>

  );
}

export default Home;