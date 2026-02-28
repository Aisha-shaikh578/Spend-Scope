import {toggle} from '../mode-toggle/mode-toggle.js';

toggle();

const month = document.querySelector('.month');
const yearSpan = document.querySelector('.year-span');
const expenses = JSON.parse(localStorage.getItem('expenses'));
const amountUsed = JSON.parse(localStorage.getItem('amountUsed'));
const categoryFilter = document.querySelector('.categoryFilter');
const container = document.querySelector('.transaction-list');
const showTotalDiv = document.querySelector('.showTotal')
const totalSpanAmt = document.querySelector('.totalSpanAmt');
const totalCount = document.querySelector('.total-count');
const totalAmt = document.querySelector('.totalAmt');
const searchBar = document.querySelector('.search-bar');
const msgBtn = document.querySelector('.msgBtn');

function initializeHistory() {
  if (!expenses || expenses.length === 0) {
    container.innerHTML = '<div class="categoryDiv">Please select or search a category</div>';
    showTotalDiv.classList.add('hide');
  }
}

searchBar.addEventListener('input', function () {
  const search = searchBar.value;

 if(search === '') {
  initializeHistory();
 } else{
    const filterSearch = expenses.filter(searchExp =>
    searchExp.category.toLowerCase().includes(search.toLowerCase())
  )

   if(filterSearch.length === 0) {
      container.innerHTML = '<div class="categoryDiv">Category not found</div>';
      showTotalDiv.classList.add('hide');
      msgBtn.classList.add('hide');
    } else{
      renderHistory(filterSearch);
      showTotalDiv.classList.add('hide');
    }
  }
 }
)

categoryFilter.addEventListener('change', function () {
  const selectedCategory = this.value;

  if(selectedCategory === 'All') {
    renderHistory(expenses);
    showTotalDiv.classList.remove('hide');
  } else {
    const filtered = expenses.filter(expense => {
      // If we dont return values in arrow function then the arrow function will take the value as undefined by itself
      return expense.category === selectedCategory;
    });

    if(filtered.length === 0) {
      container.innerHTML = '<div class="categoryDiv">Category not found</div>';
      totalAmt.classList.add('hide');
      totalCount.innerHTML = '';
      msgBtn.classList.add('hide');
    } else{
      renderHistory(filtered);
      showTotalDiv.classList.add('hide');
    }
  }
})

function renderHistory(data) {
  container.innerHTML = '';

  //Group expenses by category
  const groupedByCategory = data.reduce((total, exp) => {
    if(!total[exp.category]) {
      total[exp.category] = [];
    }
    total[exp.category].push(exp)
    return total;
  }, {});

  let totalTransactionCount = 0;

  // Rendering each category only once
 Object.entries(groupedByCategory).forEach(([category, transaction]) => {
  totalTransactionCount += transaction.length;

  const selectedCategoryDiv = document.createElement('div');
  selectedCategoryDiv.classList.add('selectedCategoryDiv');
  selectedCategoryDiv.innerHTML = `
     <div class="categoryDiv">
        <div class="category-selection">
          <img src="../icons/${category}.svg" class="${category}-img">
          <div>${category}</div>
        </div>

        <div class="${category}-category-total">₹ ${transaction.reduce((sum, exp) => Number(sum + Number(exp.amount)), 0)}</div>
      </div>
  `;

  msgBtn.classList.remove('hide');

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('details-div');
  detailsDiv.classList.add('hide');

  selectedCategoryDiv.addEventListener('click', () => {
    renderDetails(transaction, detailsDiv);
  });

  container.appendChild(selectedCategoryDiv);
  container.appendChild(detailsDiv);
 });

    totalCount.innerHTML = `Showing ${totalTransactionCount} Transactions`;
    totalAmt.classList.remove('hide');
    totalSpanAmt.textContent = `₹${amountUsed}`;
  }

function renderDetails(expensesArray, detailsDiv) {
  detailsDiv.classList.toggle('hide');
  detailsDiv.innerHTML = '';

  expensesArray.forEach((exp) => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('nestedDiv');
   
  createDiv.innerHTML += `
  <div class="detailsDivGrid">
    <div>Date: ${exp.date || 'Not added'}</div>
    <div>Amount: ${exp.amount || 'Not added'}</div>
    <div>Note: ${exp.note || 'Not added'}</div>
    <button class="deleteExpBtn">Delete</button>
  </div>
  `;

  detailsDiv.appendChild(createDiv);
  })
}

function updateDays() {
const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString('en', {month : 'long'});

month.textContent = currentMonth;
yearSpan.textContent = currentYear;
}

updateDays();
initializeHistory();