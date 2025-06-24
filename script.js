let todoInput = document.querySelector(".todo-input");
let todoBtn = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");

todoBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    let newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveToSessionStorage(todoInput.value)
    let completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    let trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
    todoInput.value="";
})

todoList.addEventListener("click",(e)=>{
    let item = e.target;
    let todo = item.parentElement;
    let tickBtn = document.getElementsByClassName("complete-btn")[0];
        

    if(item.classList[0] === "trash-btn") {
        
        todo.classList.add("slide");

        removeFromSessionStorage(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    }

    if(item.classList[0] === "complete-btn") {
        todo.classList.add("completed");
    }

    /*if(item.classList[1] === "striked") {
        todo.classList.remove("completed");
        tickBtn.classList.remove("striked");
    }*/

    

    
})

function saveToSessionStorage(todo) {
    let todos;
    if(sessionStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(sessionStorage.getItem("todos"));
    }

    todos.push(todo);
    sessionStorage.setItem("todos",JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if(sessionStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(sessionStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        let newToDo = document.createElement("li");
        newToDo.innerText = todo;
        newToDo.classList.add("todo-item");
        todoDiv.appendChild(newToDo);

        let completedBtn = document.createElement("button");
        completedBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        completedBtn.classList.add("complete-btn");
        todoDiv.appendChild(completedBtn);

        let trashBtn = document.createElement("button");
        trashBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);
    })
}

function removeFromSessionStorage(todo) {
    let todos;
    if(sessionStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(sessionStorage.getItem("todos"));
    }

    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    sessionStorage.setItem("todos",JSON.stringify(todos));
}