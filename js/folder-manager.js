import {
  saveFoldersToStorage,
  loadFoldersFromStorage,
  saveCurrentFolder,
  saveTasksToStorage,
  loadTasksFromStorage,
} from "./local-storage.js";

const folderList = document.getElementById("folder-list");
const taskList = document.getElementById("task-list");
let currentFolder = null;

export function loadFolders() {
  const folders = loadFoldersFromStorage();

  folderList.innerHTML = "";
  folders.forEach((folder) => createFolderElement(folder.name, folder.id));

  if (folders.length > 0) {
    currentFolder = localStorage.getItem("currentFolder") || folders[0].id;
    setActiveFolder(currentFolder);
  } else {
    alert("No folders available. Create a folder to add tasks.");
  }
}

function createFolderElement(name, id) {
  const li = document.createElement("li");
  li.className = "folder-item";
  li.dataset.id = id;

  const span = document.createElement("span");
  span.className = "folder-name";
  span.textContent = name;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "folder-delete";

  li.appendChild(span);
  li.appendChild(deleteBtn);
  folderList.appendChild(li);

  deleteBtn.addEventListener("click", () => deleteFolder(li));
  li.addEventListener("click", () => setActiveFolder(id));
}

export function createFolder(name, id = Date.now().toString()) {
  createFolderElement(name, id);
  saveFoldersToStorage();
  if (!currentFolder) {
    setActiveFolder(id);
  }
}

export function addTask(taskText, completed = false) {
  if (!currentFolder) {
    alert("Please select or create a folder to add tasks.");
    return;
  }

  const li = document.createElement("li");
  li.className = "tasks-list_item";
  if (completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <div class="left">
      <div class="${
        completed ? "checkbox-checked" : "checkbox-unchecked"
      }"></div>
      <span>${taskText}</span>
    </div>
    <button class="tasks-button">Delete</button>
  `;

  li.querySelector(".tasks-button").addEventListener("click", () => {
    li.remove();
    saveTasksToStorage(currentFolder);
  });

  const checkbox = li.querySelector(".left div");
  checkbox.addEventListener("click", () => {
    li.classList.toggle("completed");
    checkbox.classList.toggle("checkbox-unchecked");
    checkbox.classList.toggle("checkbox-checked");
    saveTasksToStorage(currentFolder);
  });

  // taskList.appendChild(li);
  taskList.insertBefore(li, taskList.firstChild);
  saveTasksToStorage(currentFolder);
}

export function deleteFolder(folderElement) {
  folderElement.remove();
  saveFoldersToStorage();
}

export function setActiveFolder(id) {
  currentFolder = id;
  Array.from(folderList.children).forEach((folder) => {
    folder.classList.toggle("active", folder.dataset.id === id);
  });

  taskList.innerHTML = "";
  const tasks = loadTasksFromStorage(id);
  tasks.forEach((task) => addTask(task.text, task.completed));

  saveCurrentFolder(currentFolder);
}
