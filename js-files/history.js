import {toggle} from '../mode-toggle/mode-toggle.js';

toggle();

const month = document.querySelector('.month');
const yearSpan = document.querySelector('.year-span');

function updateDays() {
const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString('en', {month : 'long'});

month.textContent = currentMonth;
yearSpan.textContent = currentYear;
}

updateDays();