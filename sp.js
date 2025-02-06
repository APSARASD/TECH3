// script.js
const taskForm = document.getElementById('taskForm');
const scheduleTable = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load from localStorage

renderTasks(); // Initial render

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const subject = document.getElementById('subject').value;
    const priority = document.getElementById('priority').value;
    const notes = document.getElementById('notes').value;

    const newTask = {
        taskName,
        dueDate,
        subject,
        priority,
        notes
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    scheduleTable.innerHTML = ""; // Clear table

    tasks.forEach((task, index) => {
        const row = scheduleTable.insertRow();
        const cells = [task.taskName, task.dueDate, task.subject, task.priority, task.notes];

        cells.forEach(cellText => {
            const cell = row.insertCell();
            cell.textContent = cellText;
        });

        const actionsCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        actionsCell.appendChild(deleteButton);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}