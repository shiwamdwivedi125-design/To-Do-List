// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// LocalStorage se tasks load karna
let tasks = JSON.parse(localStorage.getItem('todos')) || [];

// App load hone par tasks render karna
document.addEventListener('DOMContentLoaded', renderTasks);

// Task Add karne ka Event Listener
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Task Add Function
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === '') return alert('Kripya koi task likhein!');

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveAndRender();
  todoInput.value = '';
}

// Complete/Delete Handle karne ka Function
function handleTaskAction(e) {
  const li = e.target.closest('li');
  if (!li) return;
  const taskId = Number(li.dataset.id);

  // Delete Button Click
  if (e.target.classList.contains('delete-btn')) {
    tasks = tasks.filter(task => task.id !== taskId);
  } 
  // Task Text ya Checkbox Click (Toggle Complete)
  else {
    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  }

  saveAndRender();
}

taskList.addEventListener('click', handleTaskAction);

// LocalStorage me save aur UI render karne ka function
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(tasks));
  renderTasks();
}

// Tasks ko UI me render karne ka function
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" ${task.completed ? 'checked' : ''} />
        <span>${task.text}</span>
      </div>
      <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);
  });
}