// Variables
const loginForm = document.getElementById("login-form");
const appContainer = document.getElementById("app-container");
const userDisplay = document.getElementById("user-display");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const dateInput = document.getElementById("date");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Login function
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = username.value.trim();
    const pass = password.value.trim();
    
    if (user && pass) {
        userDisplay.innerText = user;
        appContainer.classList.remove("hidden");
        loginForm.parentElement.classList.add("hidden");
        init();
    } else {
        alert("Please enter a valid username and password");
    }
});

// Transaction function
form.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please add text and amount");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
            category: category.value,
            date: dateInput.value || new Date().toLocaleDateString()
        };
        transactions.push(transaction);
        updateDOM(transaction);
        updateValues();
        saveToLocalStorage();
        text.value = "";
        amount.value = "";
        dateInput.value = "";
    }
}

function generateID() {
    return Math.floor(Math.random() * 1000000000);
}

function updateDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)} (${transaction.category}) on ${transaction.date}</span> 
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0).toFixed(2) * -1;
    
    balance.innerText = `$${total}`;
    money_plus.innerText = `+ $${income}`;
    money_minus.innerText = `- $${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveToLocalStorage();
    init();
}

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
    list.innerHTML = "";
    transactions.forEach(updateDOM);
    updateValues();
}

