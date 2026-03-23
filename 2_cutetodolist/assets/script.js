// ============================================================
// JAVASCRIPT SECTION - All the logic for our To-Do List App
// ============================================================
// We will manage tasks as an array of objects. Each task has:
// - id: unique identifier (Date.now + random)
// - text: the description of the task
// - completed: boolean (true if done)
// ============================================================

// ---------- 1. INITIAL DATA ----------
// Array that holds all tasks. We'll start with a couple of cute examples.
let tasks = [
  { id: 1, text: "🌸 water the plants", completed: false },
  { id: 2, text: "📖 read 10 pages", completed: true },
  { id: 3, text: "☕ enjoy a cozy break", completed: false }
];

// Current active filter: "all", "active", "completed"
let currentFilter = "all";

// DOM element references (caching for performance)
const tasksContainer = document.getElementById("tasksList");
const taskInputField = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskBtn");
const taskCounterSpan = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

// ---------- 2. HELPER FUNCTIONS ----------

// Save tasks to localStorage so they persist after page refresh
function saveToLocalStorage() {
  // Convert tasks array to JSON string and store in browser's localStorage
  localStorage.setItem("cuteTasks", JSON.stringify(tasks));
}

// Load tasks from localStorage when app starts
function loadFromLocalStorage() {
  const storedTasks = localStorage.getItem("cuteTasks");
  if (storedTasks) {
    // If there is saved data, parse it and replace our tasks array
    tasks = JSON.parse(storedTasks);
  } else {
    // If no saved data, keep the default example tasks (already defined)
    // but we might also save them initially so they persist.
    saveToLocalStorage();
  }
}

// Function to update the counter text (shows pending & total tasks)
function updateCounter() {
  const totalTasks = tasks.length;
  // Count how many tasks are NOT completed (active)
  const activeTasks = tasks.filter(task => !task.completed).length;
  // Display a friendly message
  if (totalTasks === 0) {
    taskCounterSpan.innerText = "✨ 0 tasks ✨";
  } else {
    taskCounterSpan.innerText = `📌 ${activeTasks} active  ·  ${totalTasks} total`;
  }
}

// Render the tasks list based on current filter and tasks array
function renderTasks() {
  // 1. Filter tasks according to the currentFilter value
  let filteredTasks = [];
  if (currentFilter === "all") {
    filteredTasks = tasks;
  } else if (currentFilter === "active") {
    // active = not completed
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  // 2. If no tasks match the filter, show empty message
  if (filteredTasks.length === 0) {
    let emptyText = "✨ No tasks here! Add something cute ✨";
    if (currentFilter === "active") emptyText = "🎉 All done! No active tasks. 🎉";
    if (currentFilter === "completed") emptyText = "🌸 No completed tasks yet. Keep going! 🌸";
    tasksContainer.innerHTML = `<div class="empty-message">${emptyText}</div>`;
    updateCounter(); // still update counter for main tasks
    return;
  }

  // 3. Build HTML string for all filtered tasks
  let tasksHTML = "";
  for (let i = 0; i < filteredTasks.length; i++) {
    const task = filteredTasks[i];
    // Determine class for task item: add 'completed' class if task is done
    const completedClass = task.completed ? "completed" : "";
    // Checkbox checked attribute if completed
    const checkedAttr = task.completed ? "checked" : "";

    // Create each task card using template literals
    // data-id attribute stores the unique task id, very helpful for delete/toggle
    tasksHTML += `
<div class="task-item ${completedClass}" data-id="${task.id}">
<div class="task-content">
<input type="checkbox" class="task-checkbox" ${checkedAttr}>
<span class="task-text">${escapeHtml(task.text)}</span>
</div>
<button class="delete-btn" aria-label="Delete task">🗑️</button>
</div>
`;
  }

  // Inject HTML into the container
  tasksContainer.innerHTML = tasksHTML;

  // 4. After rendering, attach event listeners to all checkboxes and delete buttons
  // We use querySelectorAll on the newly created elements inside tasksContainer
  const checkboxes = tasksContainer.querySelectorAll(".task-checkbox");
  const deleteButtons = tasksContainer.querySelectorAll(".delete-btn");

  // For each checkbox, add change event to toggle completion status
  checkboxes.forEach((checkbox, index) => {
    // But careful: we need to find the corresponding task id from parent .task-item
    const taskItem = checkbox.closest(".task-item");
    const taskId = parseInt(taskItem.getAttribute("data-id"));

    checkbox.addEventListener("change", (event) => {
      // Prevent event bubbling, then toggle task completed status
      event.stopPropagation();
      toggleTaskCompletion(taskId);
    });
  });

  // For each delete button, add click event to delete that specific task
  deleteButtons.forEach((btn) => {
    const taskItem = btn.closest(".task-item");
    const taskId = parseInt(taskItem.getAttribute("data-id"));
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTaskById(taskId);
    });
  });

  // Update counter after rendering to show fresh stats
  updateCounter();
  // Save tasks after any render (though toggles & deletes will also save)
  saveToLocalStorage();
}

// Helper: escape special HTML characters to prevent XSS (just good practice)
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- 3. CORE TASK OPERATIONS ----------

// Add a new task: reads from input field, creates new task object, pushes to array
function addNewTask() {
  const taskText = taskInputField.value.trim();
  // If input is empty, show gentle alert and do nothing
  if (taskText === "") {
    alert("💖 Please enter a cute task! 💖");
    return;
  }

  // Create new task object
  const newTask = {
    id: Date.now(),  // unique enough using timestamp
    text: taskText,
    completed: false
  };

  // Add to tasks array
  tasks.push(newTask);
  // Clear input field
  taskInputField.value = "";
  // Re-render the list (respects current filter)
  renderTasks();
  // Save to localStorage is called inside renderTasks -> saveToLocalStorage
}

// Toggle completion status of a task by id
function toggleTaskCompletion(taskId) {
  // Find the task index in tasks array
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    // Flip the completed status (true becomes false, false becomes true)
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    // Re-render to reflect change
    renderTasks();
  }
}

// Delete a task by its id
function deleteTaskById(taskId) {
  // Filter out the task with matching id, keep all others
  tasks = tasks.filter(task => task.id !== taskId);
  // Re-render the updated tasks list
  renderTasks();
}

// Clear all completed tasks
function clearCompletedTasks() {
  // Keep only tasks that are NOT completed
  tasks = tasks.filter(task => !task.completed);
  // Re-render after removal
  renderTasks();
}

// ---------- 4. FILTER HANDLING ----------
function setFilter(filterName) {
  currentFilter = filterName;
  // Update active class on filter buttons
  filterButtons.forEach(btn => {
    const filterValue = btn.getAttribute("data-filter");
    if (filterValue === filterName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  // Re-render tasks with new filter
  renderTasks();
}

// ---------- 5. EVENT LISTENERS & INITIALIZATION ----------

// Load previously saved tasks from localStorage when page loads
loadFromLocalStorage();

// Initial render to display tasks on screen
renderTasks();

// Event: clicking the "Add task" button
addButton.addEventListener("click", addNewTask);

// Also allow pressing "Enter" key in the input field to add task
taskInputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewTask();
  }
});

// Event: clear completed tasks button
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// Event: each filter button click
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filterValue = btn.getAttribute("data-filter");
    setFilter(filterValue);
  });
});

// Extra small note: In case the user tries to delete or toggle, our dynamic event handlers
// inside renderTasks take care. Everything is reactive!

// Optionally, add a fun little console greeting
console.log("🌸 Cute To-Do List is ready! Stay productive with joy 🌸");