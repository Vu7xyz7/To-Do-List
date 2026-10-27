document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  const taskInput = document.getElementById("taskInput");
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Enter a Task!");
    return;
  }

  const task = { text: taskText, completed: false };

  renderTask(task);

  saveTaskToStorage(task);

  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.background = "red";
  deleteBtn.style.color = "white";
  deleteBtn.style.border = "none";
  deleteBtn.style.borderRadius = "5px";
  deleteBtn.style.cursor = "pointer";

  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation(); 
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  const taskElements = document.querySelectorAll("#taskList li");
  const tasks = [];

  taskElements.forEach((li) => {
    const text = li.childNodes[0].textContent; 
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => renderTask(task));
}
