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

// Sum incomes, sum expenses and total
// Somar as entradas, somas as saídas, e fazer o total
const Transaction = {
  all: [
    {
      description: 'Luz',
      amount: -50000,
      date: '03/04/2022'
    },
    {
      description: 'Website',
      amount: 500000,
      date: '03/04/2022'
    },
    {
      description: 'Feira do mês',
      amount: -100000,
      date: '03/04/2022'
    },
    {
      description: 'Internet',
      amount: -9000,
      date: '03/04/2022'
    }
  ],
  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },
  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },
  incomes() {
    // sum incomes
    let income = 0
    // pegar todas as transações
    // para cada tranasação
    Transaction.all.forEach(transaction => {
      // se ela for maior que zero
      if (transaction.amount > 0) {
        // somar a uma variável
        income += transaction.amount
      }
    })
    return income
  },
  expenses() {
    // sum expenses
    let expense = 0
    // pegar todas transações
    // para cada transação
    Transaction.all.forEach(transaction => {
      // se ela for menor que zero
      if (transaction.amount < 0) {
        // somar a uma variável
        expense += transaction.amount
      }
    })
    return expense
  },
  total() {
    // total = incomes - expenses
    return Transaction.incomes() + Transaction.expenses()
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
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    )
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    )
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(
      Transaction.total()
    )
  },
  clearTransactions() {
    DOM.transactionContainer.innerHTML = ''
  }
}

const Utils = {
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100;
    return value;
  },
  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''
    value = String(value).replace(/\D/, '')
    value = Number(value) / 100
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return signal + value
  }
}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },
  validateFields() {
    const { description, amount, date } = Form.getValues()
    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor, preencha todos os campos!')
    }
  },
  formatValues() {
    let {description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },
  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },
  submit(event) {
    event.preventDefault()

    try {
      // verificar se todas as informações foram preenchidas
      Form.validateFields();
      // formatar os dados para salvar
      const transaction = Form.formatValues();
      // salvar
      Transaction.add(transaction);
      // apagar os dados do formulário
      Form.clearFields();
      // fechar o modal
      Modal.close();
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })

    DOM.updateBalance()
  },
  reload() {
    DOM.clearTransactions()
    App.init()
  }
}

App.init()
