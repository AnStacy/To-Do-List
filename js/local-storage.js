export function saveFoldersToStorage() {
  const folders = Array.from(
    document.getElementById("folder-list").children
  ).map((folder) => ({
    id: folder.dataset.id,
    name: folder.querySelector(".folder-name").textContent.trim(),
  }));
  localStorage.setItem("folders", JSON.stringify(folders));
}

export function loadFoldersFromStorage() {
  return JSON.parse(localStorage.getItem("folders")) || [];
}

export function saveCurrentFolder(folderId) {
  localStorage.setItem("currentFolder", folderId);
}

export function saveTasksToStorage(folderId) {
  const tasks = Array.from(document.querySelectorAll(".tasks-list_item")).map(
    (item) => ({
      text: item.querySelector("span").textContent,
      completed: item.classList.contains("completed"),
    })
  );
  localStorage.setItem(`tasks_${folderId}`, JSON.stringify(tasks));
}

export function loadTasksFromStorage(folderId) {
  return JSON.parse(localStorage.getItem(`tasks_${folderId}`)) || [];
}
