let tasks = [];
let currentTaskId = null;

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>Due: ${task.dueDate}</small><br>
                <small>${task.description}</small>
            </div>
            <div>
                <button class="btn btn-warning btn-sm mr-2" onclick="openEditModal(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}

// Function to add a task
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const dueDate = document.getElementById('dueDate').value;
    const description = document.getElementById('taskDescription').value;

    tasks.push({ title, dueDate, description });
    renderTasks();
    $('#addTaskModal').modal('hide');
    this.reset(); // Reset the form
});

// Function to open the edit modal
function openEditModal(index) {
    currentTaskId = index;
    const task = tasks[index];

    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editDueDate').value = task.dueDate;
    document.getElementById('editTaskDescription').value = task.description;

    $('#editTaskModal').modal('show');
}

// Function to update a task
document.getElementById('editTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('editTaskTitle').value;
    const dueDate = document.getElementById('editDueDate').value;
    const description = document.getElementById('editTaskDescription').value;

    tasks[currentTaskId] = { title, dueDate, description };
    renderTasks();
    $('#editTaskModal').modal('hide');
});

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}