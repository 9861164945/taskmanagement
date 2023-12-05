document.addEventListener("DOMContentLoaded", function () {
  const completedTasksTable = document.getElementById("completed-tasks-table");
  const incompleteTasksTable = document.getElementById("incomplete-tasks-table");
  const taskForm = document.getElementById("task-form");

  document.getElementById("add-task-button").addEventListener("click", function () {
    const title = document.getElementById("title").value; // Fix: Changed 'nt' to 'document'
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const status = document.getElementById("status").value;

    const task = {
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
    };

    const targetTable = status === "Complete" ? completedTasksTable : incompleteTasksTable;

    addToTable(task, targetTable);

    taskForm.reset();
  });
});

function addToTable(task, table) {
  const newRow = table.insertRow(table.rows.length);

  const cells = [task.title, task.description, task.dueDate, task.status];

  for (let i = 0; i < cells.length; i++) {
    const cell = newRow.insertCell(i);
    cell.innerHTML = cells[i];
  }

  const buttonsCell = newRow.insertCell(cells.length);
  buttonsCell.innerHTML = `
    <button onclick="editTask(this)">Edit</button>
    <button onclick="deleteTask(this)">Delete</button>
  `;
}

function editTask(button) {
  const row = button.parentNode.parentNode;
  const title = row.cells[0].innerHTML;
  const description = row.cells[1].innerHTML;
  const dueDate = row.cells[2].innerHTML;
  const status = row.cells[3].innerHTML;

  alert(`Edit Task:\nTitle: ${title}\nDescription: ${description}\nDue Date: ${dueDate}\nStatus: ${status}`);
}

function deleteTask(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}