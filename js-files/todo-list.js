import { toggle } from "../mode-toggle/mode-toggle.js";

const input = document.querySelector('.input');
const date = document.querySelector('.date');
const addBtn = document.querySelector('.addBtn');
const todoDiv = document.querySelector('.todo-div');
let taskArr = JSON.parse(localStorage.getItem('tasks')) || [];

toggle();

addBtn.addEventListener('click', () => {
  addTodo();
  renderTodo();
  saveTodo();
})

function saveTodo() {
  localStorage.setItem('tasks', JSON.stringify(taskArr));
}

function addTodo() {
  const newTask = input.value;
  if(!newTask) return '';
  taskArr.push({todo: newTask, date: date.value || '',completed:false});
  input.value = '';
  date.value = '';
}

function deleteTodo(index) {
  taskArr.splice(index, 1);
  renderTodo();
  saveTodo();
}

function toggleComplete(index) {
  taskArr[index].completed = !taskArr[index].completed;
  saveTodo();
  renderTodo();
}

function renderTodo() {
  let html = '';
  taskArr.forEach((task, index) => {
    html += `
    <div class="${task.completed ? 'done' : ''} task">${task.todo}</div>
    <div class="date">${task.date}</div>
    <button class="deleteBtn" onclick="deleteTodo(${index})">Delete</button>
    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})" class="checkBox">
    `;
  });
  todoDiv.innerHTML = html;
}

window.deleteTodo = deleteTodo;
window.toggleComplete = toggleComplete;

renderTodo();