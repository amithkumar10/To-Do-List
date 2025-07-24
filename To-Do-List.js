const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add task function
function addTask() {
  if (inputBox.value.trim() === "") {
    alert("Please Enter Something!");
  } else {
    const li = document.createElement("li");
    li.textContent = inputBox.value.trim();
    li.setAttribute("tabindex", "0"); // So it can be focused using Tab
    listContainer.appendChild(li);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Unicode for ×
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// Add task with Enter key in input box
inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Handle clicks and keyboard deletion
listContainer.addEventListener("click", function (e) {
  if (e.target.nodeName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.nodeName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

// Handle keyboard deletion with Enter while focused on a todo
listContainer.addEventListener("keydown", function (e) {
  if (e.target.nodeName === "LI" && e.key === "Enter") {
    e.preventDefault(); // Prevent accidental form submissions
    e.target.remove();
    saveData();
  }
});

// Save tasks in localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Show tasks from localStorage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";

  // Make restored <li> elements tabbable again
  const liItems = listContainer.querySelectorAll("li");
  liItems.forEach((li) => {
    li.setAttribute("tabindex", "0");
  });
}
showTask();
