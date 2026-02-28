import { toggle } from "../mode-toggle/mode-toggle.js";

toggle();

const amount = document.querySelector('.inputAmt');
const formError = document.querySelector('.formError');
const category = document.querySelector('.selectCategory');
const date = document.querySelector('.inputDate');
const note = document.querySelector('.inputNote');
const addExpBtn = document.querySelector('.addExp');
const saveBtn = document.querySelector('.saveBtn');

let expensesArr = JSON.parse(localStorage.getItem('expenses')) || [];

let incomeInput = document.querySelector('.inputIncome');
// Showing saved total income
incomeInput.value = Number(localStorage.getItem('income'));

// Function to update balance
function updateBalance() {
  let balance = incomeInput.value - calculateTotalExpense();
  localStorage.setItem('balance', balance);
}
updateBalance();

// Saving total income in local storage
saveBtn.addEventListener('click', () => {
  let incomeVal = Number(incomeInput.value);
  localStorage.setItem('income', incomeVal);
  updateBalance();
});

function addExpense(newExpense) {
  expensesArr.push(newExpense);

  localStorage.setItem('expenses', JSON.stringify(expensesArr));
  localStorage.setItem('amountUsed', calculateTotalExpense());
  updateBalance();
}

function newExpense() {
  return {
    amount : amount.value,
    category : category.value,
    date : date.value,
    note : note.value,
    id: Math.round(Math.random() * 100)
  };
}

function calculateTotalExpense() {
  return expensesArr.reduce((total, exp) => total + Number(exp.amount || 0), 0);
}

addExpBtn.addEventListener('click', (e) => {
  if(amount.value === '') {
    formError.classList.remove('hide');
  }

  e.preventDefault();   //To prevent form submission
  addExpense(newExpense());
  amount.value = '';
  date.value = '';
  category.value = '';
  note.value = '';
});