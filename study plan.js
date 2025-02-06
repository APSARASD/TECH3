const taskForm = document.getElementById('taskForm');
const scheduleTable = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];

// Load tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks(); // Render initial tasks

taskForm.addEventListener('submit', function(event) {
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

    tasks.push(newTask); // Add to the tasks array
    saveTasks();       // Save to localStorage
    renderTasks();     // Re-render the table

    taskForm.reset();
});

function renderTasks() {
    scheduleTable.innerHTML = ""; // Clear the table first

    tasks.forEach((task, index) => {
        const newRow = scheduleTable.insertRow();
        const cells = [task.taskName, task.dueDate, task.subject, task.priority, task.notes];

        for (const cellText of cells) {
            const newCell = newRow.insertCell();
            newCell.textContent = cellText;
        }

        const actionsCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);  // Remove from the array
            saveTasks();            // Save updated array to local storage
            renderTasks();          // Re-render the table
        });
        actionsCell.appendChild(deleteButton);
    });
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}