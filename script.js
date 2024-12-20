const date = document.getElementById("date");
const button = document.getElementById("add-task-btn");
const input = document.getElementById("task-title");
const list = document.getElementById("task-list");

// Function to set todays date
function setTodayDate() {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[now.getDay()];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  date.innerHTML = `Today, ${dayName} ${day} ${month} ${year}`;
}

// Function to create ellement for task
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "tasks-list_item";

  const leftContainer = document.createElement("div");
  leftContainer.className = "left";

  const checkbox = document.createElement("div");
  checkbox.className = "checkbox-unchecked";
  leftContainer.appendChild(checkbox);

  const taskTextNode = document.createElement("span");
  taskTextNode.innerText = taskText;
  leftContainer.appendChild(taskTextNode);

  li.appendChild(leftContainer);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "tasks-button";
  deleteBtn.innerText = "Delete";
  li.appendChild(deleteBtn);

  list.appendChild(li);

  checkbox.addEventListener("click", toggleComplete);
  taskTextNode.addEventListener("click", toggleComplete);
  deleteBtn.addEventListener("click", () => {
    list.removeChild(li);
    saveTasks();
  });

  return li;
}

function toggleComplete(event) {
  const listItem = event.target.closest(".tasks-list_item");
  const checkbox = listItem.querySelector(
    ".checkbox-unchecked, .checkbox-checked"
  );

  listItem.classList.toggle("completed");
  if (listItem.classList.contains("completed")) {
    checkbox.classList.remove("checkbox-unchecked");
    checkbox.classList.add("checkbox-checked");
  } else {
    checkbox.classList.remove("checkbox-checked");
    checkbox.classList.add("checkbox-unchecked");
  }
  saveTasks();
}

// Add a new task
function addTask() {
  if (input.value.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }
  createTaskElement(input.value.trim());
  input.value = "";
  saveTasks();
}

// Event for the "Add" button
button.addEventListener("click", addTask);

// Event to the "Enter" button
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Load saved tasks fro LocalStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = createTaskElement(task.text);
    if (task.completed) {
      li.classList.add("completed");
      const checkbox = li.querySelector(".checkbox");
      checkbox.classList.remove("checkbox-unchecked");
      checkbox.classList.add("checkbox-checked");
    }
  });
}

// Save tasks in LocalStorage
function saveTasks() {
  const tasks = Array.from(document.querySelectorAll(".tasks-list_item")).map(
    (item) => ({
      text: item.querySelector("span").textContent.trim(),
      completed: item.classList.contains("completed"),
    })
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setTodayDate();
});
