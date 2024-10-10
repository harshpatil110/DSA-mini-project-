// Track balance, incomes, and expenses
let balance = 0;
let incomes = [];
let expenses = [];

// Select DOM elements
const balanceEl = document.getElementById('balance');
const incomeListEl = document.getElementById('incomeList');
const expenseListEl = document.getElementById('expenseList');

// Income Form Submission
document.getElementById('incomeForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Retrieve values from form
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    const date = document.getElementById('incomeDate').value;
    const type = document.getElementById('incomeType').value;
    const description = document.getElementById('incomeDescription').value;

    // Update data and balance
    incomes.push({ amount, date, type, description });
    balance += amount;

    // Update display
    updateBalance();
    displayIncomes();

    // Clear form
    event.target.reset();
});

// Expense Form Submission
document.getElementById('expenseForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Retrieve values from form
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;
    const type = document.getElementById('expenseType').value;
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;

    // Update data and balance
    expenses.push({ amount, date, type, category, description });
    balance -= amount;

    // Update display
    updateBalance();
    displayExpenses();

    // Clear form
    event.target.reset();
});

// Update balance display
function updateBalance() {
    balanceEl.textContent = `₹${balance.toFixed(2)}`;
}

// Display incomes
function displayIncomes() {
    incomeListEl.innerHTML = '';
    incomes.forEach((income) => {
        const li = document.createElement('li');
        li.textContent = `₹${income.amount} on ${income.date} [${income.type}] - ${income.description}`;
        incomeListEl.appendChild(li);
    });
}

// Display expenses
function displayExpenses() {
    expenseListEl.innerHTML = '';
    expenses.forEach((expense) => {
        const li = document.createElement('li');
        li.textContent = `₹${expense.amount} on ${expense.date} [${expense.category}] - ${expense.type}`;
        expenseListEl.appendChild(li);
    });
}
