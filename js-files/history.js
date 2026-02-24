import {toggle} from '../mode-toggle/mode-toggle.js';

toggle();

const month = document.querySelector('.month');
const yearSpan = document.querySelector('.year-span');
const expenses = JSON.parse(localStorage.getItem('expenses'));
const amountUsed = JSON.parse(localStorage.getItem('amountUsed'));
const categoryFilter = document.querySelector('.categoryFilter');
const container = document.querySelector('.transaction-list');
const totalSpanAmt = document.querySelector('.totalSpanAmt');
const totalCount = document.querySelector('.total-count');
const totaAmt = document.querySelector('.totalAmt');

categoryFilter.addEventListener('change', function () {
  const selectedCategory = this.value;

  if(selectedCategory === 'All') {
    renderHistory(expenses);
  } else if(selectedCategory === '') {
    container.classList.remove('hide');
  } else {
    const filtered = expenses.filter(expense => {
      expense.category === selectedCategory;
    });
    renderHistory(filtered);
  }
})

function renderHistory(data) {
  container.innerHTML = '';

  data.forEach((exp, idx) => {
    container.innerHTML += `
     <div class="categoryDiv">
        <div class="category-selection">
          <img src="../icons/${exp.category}.svg" class="${exp.category}-img">
          <div>${exp.category}</div>
        </div>

        <div class="${exp.category}-category-total">₹ ${exp.amount}</div>
      </div>
    `;

    totalCount.innerHTML = `Showing ${idx + 1} Transactions`;
    totaAmt.classList.remove('hide');
    totalSpanAmt.textContent = `₹${amountUsed}`;
  })
}

function updateDays() {
const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString('en', {month : 'long'});

month.textContent = currentMonth;
yearSpan.textContent = currentYear;
}

updateDays();