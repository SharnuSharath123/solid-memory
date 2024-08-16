document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const task = input.value;
        input.value = '';

        await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });

        loadTasks();
    });

    async function loadTasks() {
        const response = await fetch('/tasks');
        const tasks = await response.json();

        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            taskList.appendChild(li);
        });
    }

    loadTasks();
});
