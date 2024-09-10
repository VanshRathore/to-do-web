console.log("Welcome to my todo app");

let todos = [];

let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");

todoInputBar.addEventListener("keyup", function toggleSaveButton(){
    let todoText = todoInputBar.value;
    if(todoText.length == 0){
        if(saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");
    }
    else if(saveButton.classList.contains("disabled")){
        saveButton.classList.remove("disabled")
    }
})


saveButton.addEventListener('click' , function getTextAndAddTodo(){
    let todoText = todoInputBar.value;
    if(todoText.length == 0) return 
    let todo = {text: todoText, status:"In Progress" , finishButtonText:"Finished"};
    todos.push(todo);
    addtodo(todo, todos.length);
    todoInputBar.value = ""
})

function reRenderTodos(){
    todoDataList.innerHTML = "";
    todos.forEach((element , idx) => {
        addtodo(element , idx+1); 
    })
}

function removeTodo(event){
    // event.target.parentElement.parentElement.parentElement.remove();
    let deleteButtonPressed = event.target;
    let indexToBeRemved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    todos.splice(indexToBeRemved,1);
    reRenderTodos();
}

function finishtodo (event){
    let finishedButtonPressed = event.target;
    let indexToBeFinished = Number(finishedButtonPressed.getAttribute("todo-idx"));

    // toggle 
    if (todos[indexToBeFinished].status == "Finished"){
        todos[indexToBeFinished].status = "In Progress"
        todos[indexToBeFinished].finishButtonText = "Finished"
    }
    else{
        todos[indexToBeFinished].status = "Finished"
        todos[indexToBeFinished].finishButtonText = "Undo"
    }

    todos.sort((a,b) => {
        if(a.status == "Finished"){
            return 1;
        }
        return -1;
    })


    reRenderTodos();
}

function addtodo(todo, todoCount) {

    let rowdiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    let hr = document.createElement("hr");

    // adding css
    rowdiv.classList.add("row");
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail" ,"text-muted");
    todoActions.classList.add("d-flex" ,"justify-content-start", "gap-2" ,"todo-action");
    todoStatus.classList.add("todo-status" ,"text-muted");
    deleteButton.classList.add("btn" ,"btn-danger" ,);
    finishedButton.classList.add("btn" ,"btn-success");
    
    finishedButton.setAttribute("todo-idx", todoCount-1);
    deleteButton.setAttribute("todo-idx", todoCount-1);
    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishtodo;

    todoNumber.textContent = `${todoCount}`;
    todoDetail.textContent = todo.text;
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    finishedButton.textContent = todo.finishButtonText;

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);

    rowdiv.appendChild(todoItem);
    rowdiv.appendChild(hr);

    todoDataList.appendChild(rowdiv);
}








// refrence
// let gettodosButton = document.getElementById('get-todos');

// gettodosButton.addEventListener("click", ()=>{
//     console.log("clicked")
// })