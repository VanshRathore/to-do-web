console.log("Welcome to my todo app");

let todos = [];

let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");
let getPendingTOdosButton = document.getElementById("get-todos");

getPendingTOdosButton.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.status != "Finished");
    reRenderTodos();
})

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

//for delete button to remove todo
function removeTodo(event){
    // event.target.parentElement.parentElement.parentElement.remove();
    let deleteButtonPressed = event.target;
    let indexToBeRemved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    todos.splice(indexToBeRemved,1);
    reRenderTodos();
}

//for finish button and toggling undo and finish
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

function editTodo (event){
    let editButtonPressed = event.target;
    let indexToEdit = Number(editButtonPressed.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx = "${indexToEdit}"]`);
    let input = document.querySelector(`input[todo-idx = "${indexToEdit}"]`);
    detailDiv.style.display = "none";
    input.type = "text";
    input.value = detailDiv.textContent; 

}

function saveEdittedTodo(event) {
    let input = event.target;
    let indexToEdit = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx = "${indexToEdit}"]`);

    if(event.keyCode == 13){
        detailDiv.textContent = input.value; 
        detailDiv.style.display = "block";
        input.value = "";
        input.type = "hidden";
    }
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
    let editButton = document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");

    // adding css
    rowdiv.classList.add("row");
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail" ,"text-muted");
    todoActions.classList.add("d-flex" ,"justify-content-start", "gap-2" ,"todo-action");
    todoStatus.classList.add("todo-status" ,"text-muted");
    deleteButton.classList.add("btn" ,"btn-danger" , 'delete-todo');
    finishedButton.classList.add("btn" ,"btn-success", 'finish-todo');
    editButton.classList.add("btn" ,"btn-warning" , 'edit-todo');
    hiddenInput.classList.add("form-control","todo-detail");
    
    finishedButton.setAttribute("todo-idx", todoCount-1);
    deleteButton.setAttribute("todo-idx", todoCount-1);
    editButton.setAttribute("todo-idx", todoCount-1);
    todoDetail.setAttribute("todo-idx", todoCount-1);
    hiddenInput.setAttribute("todo-idx", todoCount-1);
    hiddenInput.type = "hidden" ;

    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishtodo;

    editButton.onclick = editTodo;
    hiddenInput.addEventListener("keypress", saveEdittedTodo);

    todoNumber.textContent = `${todoCount}`;
    todoDetail.textContent = todo.text;
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    finishedButton.textContent = todo.finishButtonText;
    editButton.textContent = "Edit";

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);
    todoActions.appendChild(editButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
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