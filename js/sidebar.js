import { createFolder, loadFolders } from "./folder-manager.js";
import { setTodayDate } from "./date.js";
import { addTask } from "./folder-manager.js";

const folderInput = document.getElementById("folder-search");
const addFolderBtn = document.getElementById("add-folder-btn");
const taskInput = document.getElementById("task-title");
const addTaskBtn = document.getElementById("add-task-btn");

function addFolder() {
  const folderName = folderInput.value.trim();
  if (!folderName) {
    alert("Folder name cannot be empty!");
    return;
  }
  createFolder(folderName);
  folderInput.value = "";
}

function addNewTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Task cannot be empty!");
    return;
  }
  addTask(taskText);
  taskInput.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  loadFolders();
  setTodayDate();
});

addFolderBtn.addEventListener("click", addFolder);
folderInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addFolder();
  }
});

addTaskBtn.addEventListener("click", addNewTask);
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewTask();
  }
});
