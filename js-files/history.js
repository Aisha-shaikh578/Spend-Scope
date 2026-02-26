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
const searchBar = document.querySelector('.search-bar');

function initializeHistory() {
  if (!expenses || expenses.length === 0) {
    container.innerHTML = '<div class="categoryDiv">Category not found</div>';
    totaAmt.classList.add('hide');
    totalCount.innerHTML = '';
    return;
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
      totaAmt.classList.add('hide');
      totalCount.innerHTML = '';
    } else{
      renderHistory(filterSearch);
    }
  }
 }
)

categoryFilter.addEventListener('change', function () {
  const selectedCategory = this.value;

  if(selectedCategory === 'All') {
    renderHistory(expenses);
  } else if(selectedCategory === '') {
    container.classList.remove('hide');
  } else {
    const filtered = expenses.filter(expense => {
      // If we dont return values in arrow function then the arrow function will take the value as undefined by itself
      return expense.category === selectedCategory;
    });

    if(filtered.length === 0) {
      container.innerHTML = '<div class="categoryDiv">Category not found</div>';
      totaAmt.classList.add('hide');
      totalCount.innerHTML = '';
    } else{
      renderHistory(filtered);
    }
  }
})

function historyDetails(data) {
  const idxExp = expenses[data];
  renderDetails(idxExp);
}

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
      <div class="details-div"></div>
    `;

    container.querySelectorAll('.categoryDiv').forEach((element, idx) => {
      element.addEventListener('click', () => renderDetails(data[idx]));
    })

    totalCount.innerHTML = `Showing ${idx + 1} Transactions`;
    totaAmt.classList.remove('hide');
    totalSpanAmt.textContent = `₹${amountUsed}`;
  })
}

function renderDetails(idxExp) {
  const createDiv = document.createElement('div');
  const detailsDiv = document.querySelector('.details-div');
  createDiv.classList.add('nestedDiv');

 createDiv.innerHTML += `
    <div>Date: ${idxExp.date}</div>
    <div>Amount: ${idxExp.amount}</div>
    <div>Note: ${idxExp.note}</div>
  `;

  console.log(idxExp);
  detailsDiv.appendChild(createDiv);
}

function updateDays() {
const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString('en', {month : 'long'});

month.textContent = currentMonth;
yearSpan.textContent = currentYear;
}

window.historyDetails = historyDetails;

updateDays();
initializeHistory();