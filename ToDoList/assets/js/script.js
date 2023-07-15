// Get references to the HTML elements
const userInput = document.getElementById("todoUserInput");
const addTodoButton = document.getElementById("addTodoButton");
const todoItemsContainer = document.getElementById("todoItemsContainer");
const saveTodoButton = document.getElementById("saveTodoButton");

// Load saved todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to render the todo list
function renderTodoList() {
  todoItemsContainer.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItemContainer = document.createElement("li");
    todoItemContainer.classList.add("todo-item-container");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("checkbox-input");
    checkboxInput.checked = todo.completed;
    checkboxInput.id = `checkbox-${index}`;
    checkboxInput.addEventListener("change", () => {
      toggleTodoCompleted(index);
    });
    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("checkbox-label");
    checkboxLabel.innerText = todo.task;
    checkboxLabel.setAttribute("for", `checkbox-${index}`); // Set the for attribute of the label to match the checkbox id
    if (todo.completed) {
      checkboxLabel.classList.add("checked");
    }

    const deleteIconContainer = document.createElement("span");
    deleteIconContainer.classList.add("delete-icon-container");
    deleteIconContainer.innerHTML = '<i class="fas fa-trash delete-icon"></i>';
    deleteIconContainer.addEventListener("click", () => {
      deleteTodoItem(index);
    });

    todoItemContainer.appendChild(checkboxInput);
    todoItemContainer.appendChild(checkboxLabel);
    todoItemContainer.appendChild(deleteIconContainer);
    todoItemsContainer.appendChild(todoItemContainer);
  });
}

// Function to add a new todo item
function addTodoItem() {
  const task = userInput.value.trim();

  if (task !== "") {
    const newTodo = {
      task,
      completed: false
    };

    todos.push(newTodo);

    renderTodoList();

    userInput.value = "";
    userInput.focus();
  }
}

// Function to toggle the completed state of a todo item
function toggleTodoCompleted(index) {
  todos[index].completed = !todos[index].completed;
  renderTodoList();
}

// Function to delete a todo item
function deleteTodoItem(index) {
  todos.splice(index, 1);
  renderTodoList();
}

// Function to save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add event listeners
addTodoButton.addEventListener("click", addTodoItem);
saveTodoButton.addEventListener("click", saveTodos);

// Initial render of the todo list
renderTodoList();
