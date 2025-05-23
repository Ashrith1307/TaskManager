// Reference to form and input
const taskForm = document.getElementById("task-form");
const taskTitleInput = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const tasksContainer = document.getElementById("tasks-container");

// Listen to form submit
taskForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent page reload

  const title = taskTitleInput.value.trim();
  const description = taskDesc.value;
  if (title === "" && description === "") return;
  try {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      taskTitleInput.value = "";
      taskDesc.value = "";
      loadTasks();
    }
  } catch (error) {
    console.error("Error Adding Tasks");
  }
});

// Delete functionality using event delegation
async function loadTasks() {
  try {
    const response = await fetch("http://localhost:5000/tasks");
    const tasks = await response.json();

    tasksContainer.innerHTML = ""; // Clear any existing tasks

    tasks.forEach((task) => {
      const taskCard = document.createElement("div");
      taskCard.className =
        "task-card bg-white p-4 rounded shadow flex justify-between items-start mb-3";
      taskCard.dataset.id = task._id;

      taskCard.innerHTML = `
<div>
<p class="font-semibold">${task.title}</p>
<p class="text-sm text-gray-600">${task.description}</p>
</div>
<button class="text-red-500 hover:text-red-700 font-semibold delete-btn">Delete</button>
`;

      tasksContainer.appendChild(taskCard);
    });
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
}

tasksContainer.addEventListener("click", async function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const taskcard = e.target.closest(".task-card");
    const taskid = taskcard.dataset.id;

    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        taskcard.remove();
      }
    } catch (error) {
      console.error(`Error in Deleting the task: ${taskid}`);
    }
  }
});
window.addEventListener("DOMContentLoaded", loadTasks);
