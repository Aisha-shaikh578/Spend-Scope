import { toggle } from "./mode-toggle/mode-toggle.js";

toggle();

// Getting total income from local storage
const incomeAmt = document.querySelector('.income-amt');
incomeAmt.textContent = `₹${localStorage.getItem('income') || 0}`;

//Getting amountUsed from local storage
const amountUsed = document.querySelector('.expense-amt');
amountUsed.textContent = `₹${localStorage.getItem('amountUsed') || 0}`;

// Getting remaining balance from local storage
const balanceAmt = document.querySelector('.balance-amt');
balanceAmt.textContent = `₹${localStorage.getItem('balance') || 0}`;

/* Updating Recent Expenses */
const dateHeading = document.querySelector('.dateHeading');
const categoryHeading = document.querySelector('.categoryHeading');
const amountHeading = document.querySelector('.amountHeading');
const noteHeading = document.querySelector('.noteHeading');

const expense = JSON.parse(localStorage.getItem('expenses'));

for(let i= expense.length-2; i < expense.length; i++) {
  let dateDiv = document.createElement('div');
  dateHeading.append(dateDiv);
  dateDiv.classList.add('styleRows');
  dateDiv.style.color = '#5f5d61';
  dateDiv.innerText = expense[i].date || 'Not added';

  let categoryDiv = document.createElement('div');
  categoryHeading.append(categoryDiv);
  categoryDiv.classList.add('styleRows');
  categoryDiv.style.color = '#5b1ba4';
  categoryDiv.innerText = expense[i].category || 'Not added';

  let amountDiv = document.createElement('div');
  amountHeading.append(amountDiv);
  amountDiv.classList.add('styleRows');
  amountDiv.style.color = '#4d20c0';
  amountDiv.innerText = expense[i].amount || 'Not added';

  let noteDiv = document.createElement('div');
  noteHeading.append(noteDiv);
  noteDiv.classList.add('styleRows');
  noteDiv.style.color = '#8811a5';
  noteDiv.innerText = expense[i].note || 'Not added';
}
