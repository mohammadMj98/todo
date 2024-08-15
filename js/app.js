// عناصر HTML را به صورت یک‌بار برای همیشه انتخاب می‌کنیم.
const inputItem = document.querySelector('#input-item');
const addBtn = document.querySelector('.add-btn');
const clearBtn = document.querySelector('#Clear');
const todoList = document.querySelector('.todolist');

let todoArray = [];

window.addEventListener('load', () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    todoArray = storedTodos ? storedTodos : [];
    renderTodos(todoArray);
});



function addTodo() {
    const inputValue = inputItem.value.trim();
    
    if (inputValue) {
        const newTodo = {
            id: Date.now(),
            title: inputValue,
            status: false
        };
        todoArray.push(newTodo);
        updateLocalStorage(todoArray);
        renderTodos(todoArray);
        inputItem.value = ''; 
    } else {
        alert('Oops! Please enter a valid value.');
    }
}

inputItem.addEventListener('keydown' , (event)=>{
    if(event.keyCode === 13){
        addTodo()
    }
})

addBtn.addEventListener('click' ,addTodo)

function updateLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const titleClass = todo.status ? 'todo-title completed' : 'todo-title';
        const buttonText = todo.status ? 'Incomplete' : 'Complete';

        todoList.insertAdjacentHTML('beforeend', `
            <div class="box" data-id="${todo.id}">
                <h3 class="${titleClass}">${todo.title}</h3>
                <div class="todo-btn">
                    <button class="btn complete-btn">${buttonText}</button>
                    <button class="btn delete-btn">Delete</button>
                </div>
            </div>
        `);
    });

    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const todoId = parseInt(e.target.closest('.box').dataset.id);
            toggleComplete(todoId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const todoId = parseInt(e.target.closest('.box').dataset.id);
            deleteTodo(todoId);
        });
    });
}

function toggleComplete(id) {
    const todoIndex = todoArray.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todoArray[todoIndex].status = !todoArray[todoIndex].status;
        updateLocalStorage(todoArray);
        renderTodos(todoArray);
    }
}

function deleteTodo(id) {
    todoArray = todoArray.filter(todo => todo.id !== id);
    updateLocalStorage(todoArray);
    renderTodos(todoArray);
}

clearBtn.addEventListener('click', () => {
    todoArray = [];
    updateLocalStorage(todoArray);
    renderTodos(todoArray);
});

