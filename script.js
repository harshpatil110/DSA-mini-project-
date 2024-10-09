let balance = 0;

document.getElementById('incomeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const amount = parseFloat(this[0].value);
    const date = this[1].value;
    const type = this[2].value;
    const description = this[3].value;

    balance += amount;

    document.getElementById('balance').innerText = balance.toFixed(2);
    
    const incomeList = document.getElementById('incomeList');
    
    const li = document.createElement('li');
    li.textContent = `₹${amount.toFixed(2)} on ${date} [${type}] - ${description}`;
    
    incomeList.appendChild(li);
    
    this.reset();
});

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const amount = parseFloat(this[0].value);
    
   // Deducting from balance
   balance -= amount;

   document.getElementById('balance').innerText = balance.toFixed(2);
   
   const expenseList = document.getElementById('expenseList');
   
   const li = document.createElement('li');
   li.textContent = `₹${amount.toFixed(2)} on ${this[1].value} [${this[3].value}] - ${this[4].value}`;
   
   expenseList.appendChild(li);
   
   this.reset();
});
