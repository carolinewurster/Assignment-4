const addButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const tasksContainer = document.getElementById('tasksContainer');
const completedTasksContainer = document.getElementById('completedTasks');

function createEditableTask(taskText) {
  const newTask = document.createElement("div");
  newTask.classList.add("task");

  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;
  taskContent.classList.add("task-content");
  taskContent.contentEditable = true; 

  // Used ChatGPT to figure out how to edit tasks once they're submitted

  const checkmarkButton = document.createElement("button");
  checkmarkButton.innerHTML = "✓";
  checkmarkButton.classList.add("checkmark-btn");

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "❌";
  deleteButton.classList.add("delete-btn");

  deleteButton.onclick = function() {
    if (newTask.parentElement === completedTasksContainer) {
      completedTasksContainer.removeChild(newTask);
    }
  };

  newTask.appendChild(taskContent);
  newTask.appendChild(checkmarkButton);
  newTask.appendChild(deleteButton);

  checkmarkButton.onclick = function() {
    newTask.classList.toggle("completed");
    if (newTask.classList.contains("completed")) {
      tasksContainer.removeChild(newTask);
      completedTasksContainer.appendChild(newTask);
      newTask.removeChild(checkmarkButton); 
      taskContent.contentEditable = false; 
    }
  };

  taskContent.addEventListener('input', () => {
    saveTasks();
  });

  return newTask;
}

function moveTaskToCompleted(taskElement) {
  taskElement.classList.toggle("completed");
  tasksContainer.removeChild(taskElement);
  completedTasksContainer.appendChild(taskElement);
  taskElement.removeChild(taskElement.querySelector(".checkmark-btn"));
  taskElement.querySelector(".task-content").contentEditable = false; // Disable editing for completed tasks
  saveTasks();
}

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = createEditableTask(taskText);
  tasksContainer.appendChild(newTask);
  taskInput.value = "";

  saveTasks();
});

function saveTasks() {
  localStorage.setItem('tasks', tasksContainer.innerHTML);
}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('tasks')) {
    tasksContainer.innerHTML = localStorage.getItem('tasks');
  }
});

tasksContainer.addEventListener('click', (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('checkmark-btn')) {
    const task = clickedElement.closest('.task');
    moveTaskToCompleted(task);
  }
});




