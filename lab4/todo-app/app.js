"use strict";
let todos = [
    { id: 1, text: "See Lecture", completed: false },
    { id: 2, text: "Solve assignment", completed: false }
];
let currentFilter = "all";
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const itemsLeftSpan = document.getElementById("items-left");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const clearAllBtn = document.getElementById("clear-all-btn");
function render() {
    todoList.innerHTML = "";
    const filteredTodos = todos.filter((todo) => {
        if (currentFilter === "active")
            return !todo.completed;
        if (currentFilter === "completed")
            return todo.completed;
        return true; // "all"
    });
    filteredTodos.forEach((todo) => {
        const { id, text, completed } = todo; // destructure into id w text w completed
        const li = document.createElement("li");
        li.className = `todo-item ${completed ? "completed" : ""}`;
        const checkBtn = document.createElement("button");
        checkBtn.className = `check-btn ${completed ? "checked" : ""}`;
        checkBtn.innerHTML = completed ? "✓" : "";
        checkBtn.addEventListener("click", () => toggleTodo(id));
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = text;
        span.addEventListener("dblclick", () => startEditing(li, todo));
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "🗑";
        deleteBtn.title = "Delete";
        deleteBtn.addEventListener("click", () => deleteTodo(id));
        li.appendChild(checkBtn);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
    //counter of items left
    const activeCount = todos.filter((t) => !t.completed).length;
    itemsLeftSpan.textContent = `${activeCount} ${activeCount === 1 ? "item" : "items"} left`;
    // update filter CSS
    filterButtons.forEach((btn) => {
        const filter = btn.getAttribute("data-filter");
        if (filter === currentFilter) {
            btn.classList.add("active");
        }
        else {
            btn.classList.remove("active");
        }
    });
}
// 5. Action Functions
function addTodo() {
    const text = todoInput.value.trim();
    if (text === "")
        return;
    const newTodo = {
        id: Date.now(),
        text,
        completed: false
    };
    todos.push(newTodo); // Array push()
    todoInput.value = "";
    render();
}
function toggleTodo(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    render();
}
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    render();
}
function startEditing(li, todo) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = todo.text;
    li.innerHTML = "";
    li.appendChild(input);
    input.focus();
    const saveEdit = () => {
        const newText = input.value.trim();
        if (newText !== "") {
            todo.text = newText;
        }
        else {
            deleteTodo(todo.id);
            return;
        }
        render();
    };
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            saveEdit();
        if (e.key === "Escape")
            render();
    });
    input.addEventListener("blur", () => saveEdit());
}
function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
    render();
}
function clearAll() {
    todos = [];
    render();
}
function setFilter(filter) {
    currentFilter = filter;
    render();
}
// 6. Event Listeners
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        addTodo();
});
filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        setFilter(filter);
    });
});
clearCompletedBtn.addEventListener("click", clearCompleted);
clearAllBtn.addEventListener("click", clearAll);
// Initial Load
render();
