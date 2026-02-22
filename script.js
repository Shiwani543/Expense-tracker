const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();

    text.value = '';
    amount.value = '';
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

function init() {
    list.innerHTML = '';

    let total = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(transaction => {
        const sign = transaction.amount < 0 ? '-' : '+';

        const li = document.createElement('li');
        li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

        li.innerHTML = `
            ${transaction.text}
            <span>${sign}₹${Math.abs(transaction.amount)}</span>
            <button onclick="removeTransaction(${transaction.id})">x</button>
        `;

        list.appendChild(li);

        total += transaction.amount;
        if (transaction.amount > 0) incomeTotal += transaction.amount;
        else expenseTotal += transaction.amount;
    });

    balance.innerText = `₹${total.toFixed(2)}`;
    income.innerText = `₹${incomeTotal.toFixed(2)}`;
    expense.innerText = `₹${Math.abs(expenseTotal).toFixed(2)}`;
}

form.addEventListener('submit', addTransaction);
init();