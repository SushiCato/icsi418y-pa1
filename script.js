// Select the form and key input elements from the DOM.
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const priorityInput = document.querySelector('#priority-input');
const taskList = document.querySelector('#task-list');

// Store all tasks in memory.
const tasks = [];

// Create a DOM element for a single task based on its data and its index.
function createTaskElement(task, index) {
    // Create the outer container for the task.
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');

    // Apply the completed styling if the task is done.
    if (task.completed) {
        taskElement.classList.add('completed');
    }

    // Create the task text display.
    const taskText = document.createElement('span');
    taskText.textContent = `${task.name} (${task.priority})`;

    // Create the complete/incomplete toggle button.
    const completeButton = document.createElement('button');
    completeButton.type = 'button';
    completeButton.textContent = task.completed ? 'Incomplete' : 'Complete';
    completeButton.addEventListener('click', function () {
        // Toggle the completed state for the clicked task.
        tasks[index].completed = !tasks[index].completed;
        displayTasks();
    });

    // Create the delete button for the task.
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        // Remove the task from the array and re-render the list.
        tasks.splice(index, 1);
        displayTasks();
    });

    // Add all child elements to the task container.
    taskElement.appendChild(taskText);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(deleteButton);

    return taskElement;
}

// Render the current list of tasks to the page.
function displayTasks() {
    // Clear the current list before re-rendering.
    taskList.innerHTML = '';

    // Create and append a task element for each task.
    tasks.forEach(function (task, index) {
        taskList.appendChild(createTaskElement(task, index));
    });
}

// Listen for the form submission and add a new task.
form.addEventListener('submit', function (event) {
    // Prevent the page from reloading when submitting the form.
    event.preventDefault();

    // Read the task name and selected priority.
    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    // Ignore empty task submissions.
    if (!taskName) {
        return;
    }

    // Build a new task object.
    const task = {
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    // Add the task to the array and reset the form inputs.
    tasks.push(task);
    taskInput.value = '';
    priorityInput.value = 'low';
    displayTasks();
});

// Display the initial task list if the task list container exists.
if (taskList) {
    displayTasks();
}
