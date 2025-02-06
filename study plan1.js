const taskForm = document.getElementById('taskForm');
const scheduleTable = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];

// Load tasks from localStorage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initial rendering of tasks
renderTasks();

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const subject = document.getElementById('subject').value;
    const priority = document.getElementById('priority').value;
    const notes = document.getElementById('notes').value;

    const newTask = {
        taskName: taskName,
        dueDate: dueDate,
        subject: subject,
        priority: priority,
        notes: notes
    };

    tasks.push(newTask); // Add task to the array

    saveTasksToLocalStorage(); // Save tasks to localStorage

    renderTasks(); // Re-render the table

    taskForm.reset(); // Clear the form
});


function renderTasks() {
    scheduleTable.innerHTML = ""; // Clear the table before rendering

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
            tasks.splice(index, 1); // Remove task from array
            saveTasksToLocalStorage(); // Update localStorage
            renderTasks(); // Re-render table
        });
        actionsCell.appendChild(deleteButton);
    });
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}