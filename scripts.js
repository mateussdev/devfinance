// Recriar essa lógica usando toggle depois
const Modal = {
  open() {
    // Open modal
    // Add active class to modal
    document.querySelector('.modal-overlay').classList.add('active')
  },
  close() {
    // Close modal
    // Remove active class from modal
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '03/04/2022'
  },
  {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '03/04/2022'
  },
  {
    id: 3,
    description: 'Feira do mês',
    amount: -100000,
    date: '03/04/2022'
  },
  {
    id: 4,
    description: 'Internet',
    amount: -9000,
    date: '03/04/2022'
  },
]

// Sum incomes, sum expenses and total
// Somar as entradas, somas as saídas, e fazer o total
const Transaction = {
  incomes() {
    // sum incomes
    let income = 0;
    // pegar todas as transações
    // para cada tranasação
    transactions.forEach(transaction => {
      // se ela for maior que zero
      if(transaction.amount > 0) {
        // somar a uma variável 
        income += transaction.amount;
      }
    })
    return income;
  },
  expenses() {
    // sum expenses
    let expense = 0;
    // pegar todas transações
    // para cada transação
    transactions.forEach(transaction => {
      // se ela for menor que zero
      if(transaction.amount < 0){
        // somar a uma variável
        expense += transaction.amount;
      }
    })
    return expense;
  },
  total() {
    // total = incomes - expenses
    return Transaction.incomes() + Transaction.expenses();
  }
}

// Replace HTML data with JavaScript data
// Substituir os dados do HTML com os dados do JS
const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)
    DOM.transactionContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction) {
    const CSSClass = transaction.amount > 0 ? 'income' : 'expense'
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSClass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="assets/minus.svg" alt="Imagem de Remoção">
      </td>
    `
    return html
  },
  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());

  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    value = String(value).replace(/\D/, "");
    value = Number(value) / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    return signal + value;
  }
}

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction)
})

DOM.updateBalance()