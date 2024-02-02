import { useState } from 'react';
import api from '../services/api';
import { Transaction } from '../types/Transaction';

export function useModal() {
    const [modalTeste, setModalTeste] = useState(false);

    const [credit, setCredit] = useState(0);
    const [debit, setDebit] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadIncome(token: string) {
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

    return {
        credit,
        debit,
        transactions,
        loadIncome
    };
}

