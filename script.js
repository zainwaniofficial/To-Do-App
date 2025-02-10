const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const displayUl = document.getElementById('display-ul');
let editTodo = null;

function addTodo() {
    const userValue = userInput.value.trim();

    if (userValue === '') {
        alert('haa g khali add karke kya hoga');
        return false;
    }

    if (addBtn.value === 'edit') {
        let oldValue = editTodo.target.previousElementSibling.innerHTML; // Get old value
        editTodo.target.previousElementSibling.innerHTML = userValue; // Update UI
        editLocalStorage(oldValue, userValue); // Update local storage
        addBtn.value = 'Add';
        userInput.value = '';
    } else {
        const li = document.createElement('li');
        const para = document.createElement('p');
        para.innerHTML = userValue;
        li.appendChild(para);

        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'edit';
        editBtn.classList.add('btn', 'edit-btn');
        li.appendChild(editBtn);

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('btn', 'delete-btn');
        li.appendChild(deleteBtn);

        displayUl.appendChild(li);
        userInput.value = '';

        saveToLocalStorage(userValue);
    }
}

const updateDisplayUl = (e) => {
    if (e.target.innerHTML === 'Delete') {
        displayUl.removeChild(e.target.parentElement);
        deleteLocalStorage(e.target.parentElement);
    }

    if (e.target.innerHTML === 'edit') {
        userInput.value = e.target.previousElementSibling.innerHTML;
        userInput.focus();
        addBtn.value = 'edit';
        editTodo = e;
    }
};

displayUl.addEventListener('click', updateDisplayUl);

function saveToLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalStorage() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach(todo => {
        const li = document.createElement('li');
        const para = document.createElement('p');
        para.innerHTML = todo;
        li.appendChild(para);

        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'edit';
        editBtn.classList.add('btn', 'edit-btn');
        li.appendChild(editBtn);

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('btn', 'delete-btn');
        li.appendChild(deleteBtn);

        displayUl.appendChild(li);
    });
}

function deleteLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    let todoText = todo.children[0].innerHTML;
    let todoTextIndex = todos.indexOf(todoText);

    if (todoTextIndex !== -1) {
        todos.splice(todoTextIndex, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function editLocalStorage(oldTodo, newTodo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    let todoTextIndex = todos.indexOf(oldTodo);

    if (todoTextIndex !== -1) {
        todos[todoTextIndex] = newTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

document.addEventListener('DOMContentLoaded', getLocalStorage);
addBtn.addEventListener('click', addTodo);
