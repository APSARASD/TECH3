// script.js
const taskInput = document.getElementById('task-input');
const deadlineInput = document.getElementById('deadline-input');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksContainer = document.getElementById('tasks-container');
const filterDateInput = document.getElementById('filter-by-date');

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load from local storage

function renderTasks(tasksToRender = tasks) { // Added parameter for filtering
    tasksContainer.innerHTML = ''; // Clear existing tasks

    tasksToRender.forEach((task, index) => {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = `${task.text} (Due: ${task.deadline})`; // Display deadline
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        tasksContainer.appendChild(li);
    });
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to local storage
}

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    const deadline = deadlineInput.value;

    if (taskText.trim() !== "" && deadline !== "") {
        tasks.push({ text: taskText, deadline: deadline });
        saveTasks();
        renderTasks();
        taskInput.value = "";
        deadlineInput.value = "";
    } else {
      alert("Please enter a task and deadline."); // Simple validation
    }
});

filterDateInput.addEventListener('change', () => {
    const filterDate = filterDateInput.value;

    if (filterDate) {
        const filteredTasks = tasks.filter(task => {
            const taskDate = task.deadline.split('T')[0]; // Extract date part
            return taskDate === filterDate;
        });
        renderTasks(filteredTasks); // Render filtered tasks
    } else {
        renderTasks(); // Render all tasks if no filter
    }
});


renderTasks(); // Initial render