import { toggle } from '../mode-toggle/mode-toggle.js';
toggle();

const inputUserName = document.querySelector('.name-input-profile');
inputUserName.value = localStorage.getItem('userName') || '';

const incomeProfile = document.querySelector('.income-input-profile');
incomeProfile.value = localStorage.getItem('income') || 0;

const addProfileLogo = document.querySelector('.add-profile-logo');

const notifications = document.querySelector('.notifications');
const notificationsDiv = document.querySelector('.notificationsDiv');
const userInfoDiv = document.querySelector('.user-info-div');

const deleteAccountBtn = document.querySelector('.deleteAccountBtn');

let mode = localStorage.getItem('currentMode');
const lightTheme = document.querySelector('.lightTheme');
const darkTheme = document.querySelector('.darkTheme');

inputUserName.addEventListener('input', () => {
  localStorage.setItem('userName', inputUserName.value);
})

incomeProfile.addEventListener('input', () => {
  localStorage.setItem('income', incomeProfile.value);
})

addProfileLogo.addEventListener('click', () => {
  addProfileLogo.classList.add('now')
  notifications.classList.remove('now');
  notificationsDiv.classList.add('hide');
  userInfoDiv.classList.remove('hide');
})

notifications.addEventListener('click', () => {
  addProfileLogo.classList.remove('now')
  notifications.classList.add('now');
  notificationsDiv.classList.remove('hide');
  userInfoDiv.classList.add('hide');
})

deleteAccountBtn.addEventListener('click', () => {
  inputUserName.value = '';
  incomeProfile.value = '';
  localStorage.setItem('userName', inputUserName.value);
  localStorage.setItem('income', incomeProfile.value);
})

if(mode === 'dark') {
  darkTheme.classList.add('currTheme');
  lightTheme.classList.remove('currTheme');
} else{
  darkTheme.classList.remove('currTheme');
  lightTheme.classList.add('currTheme');
}