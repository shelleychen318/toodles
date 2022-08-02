var menuTask = 1; // toggles menu icon to open and close side navigation: 1 = open, 2 = close 

// ............................................. SELECTORS ............................................. //

const todoInput = document.querySelector('.todo-input');
const addButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');
const showCompletedButton = document.querySelector('.show-completed');
const menuButton = document.querySelector('.menu-icon');
const sideNav = document.querySelector('.side-nav');

// .......................................... EVENT LISTENERS .......................................... //

// checks if user is typing to allow them to add a todo
todoInput.addEventListener('keyup', () => {

    // user is typing
    if(todoInput.value !== "") 
    {
      addButton.disabled = false; // enable add button
    } 
    // if user is not typing
    else {
      addButton.disabled = true; // disable add button
    }
});

// if add button has been clicked, call 'addTodo' function
addButton.addEventListener('click', addTodo);

// if any part of the todo list has been clicked, call 'deleteCheck' function
todoList.addEventListener('click', deleteCheck);

// changes text of button once clicked
showCompletedButton.addEventListener("click", ()=>{

  if(showCompletedButton.innerText === "Show Completed")
  {
      showCompletedButton.innerText = "Hide Completed";
      showCompletedTasks();
  }
  else
  {
      showCompletedButton.innerText= "Show Completed";
      hideCompletedTasks();
  }
});

document.addEventListener('DOMContentLoaded', getTodos);

menuButton.addEventListener('click', toggleMenu);

// ............................................. FUNCTIONS ............................................. //

// function to create a new todo item in the list
function addTodo(event) {
    
    // create todo div
    const todoDiv = document.createElement("div"); // create a new div tag in the HTML for the new todo
    todoDiv.classList.add("todo"); // add a class called 'todo' to the new div

    // create checkbox 
    const checkbox = document.createElement('input');
    checkbox.type = "radio";
    checkbox.classList.add('complete-button');
    todoDiv.appendChild(checkbox);

    // create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo); // put new todo into the div we created

    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&times;';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton)

    // append to list in HTML
    todoList.appendChild(todoDiv);

    // todoInput.value = "";
    document.getElementById('input').value = ""; // clear input value after new todo has been added
    document.getElementById("submit").disabled = true; // disable add button
}

// function to check if user has clicked a delete button on a todo item
function deleteCheck(e) {

  console.log(e.target); // print the element clicked by user to the console

  const item = e.target; // grab element that user has clicked

  // if user clicks delete button (item is the delete button)
  if (item.classList[0] === 'delete-button')
  {
    const todo = item.parentElement; // parent of 'item' is the todo div
    todo.classList.add('fade-out'); // add animation
    removeLocalTodos(todo); // remove todo from local storage
    // once animation is over, remove the entire todo div
    todo.addEventListener('transitionend', function() {
      todo.remove(); 
    });
  }

  // if user clicks checkbox (item is the complete button)
  if (item.classList[0] === 'complete-button')
  {
    const todo = item.parentElement; // parent of 'item' is the todo div
    todo.classList.toggle("completed");
    const text = todo.querySelector('.todo-item'); // get text of todo item by selecting its class
    text.classList.toggle("strike"); // change attributes of the text using class 
    // todo.classList.toggle("completed");
  }
}

function filterList(e) {

  const todos = todoList.childNodes; // get all todos in the list
  // console.log(todos);

  // loop through all todos and check their completion status
  todos.forEach(function(todo){
    // get option that user selected from drop-down filter list
    switch(e.target.value) {
      case "all":
        todo.style.display = 'flex'; // display all todos
        break;
      case "completed":
          // if the todo has a class of 'completed'
          if(todo.classList.contains("completed")) {
            todo.style.display = 'flex';
          }
          else {
            todo.style.display = 'none';
          }
          break;
      case "uncompleted":
        // if the todo does not have a class of 'completed'
          if(!todo.classList.contains("completed")) {
            todo.style.display = 'flex';
          }
          else {
            todo.style.display = 'none';
          }
          break;
    }
  });
}

function showCompletedTasks()
{
  const todos = todoList.childNodes; // get all todos in the list

  todos.forEach(function(todo) {
    todo.style.display = 'flex';
  });
}

function hideCompletedTasks()
{
  const todos = todoList.childNodes; // get all todos in the list

  todos.forEach(function(todo) {
  if(!todo.classList.contains("completed")) {
    todo.style.display = 'flex';
  }
  else {
    todo.style.display = 'none';
  }
  });
}

function saveLocalTodos(todo) {

  // check if we already have todo list stored
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = []; // create empty array
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos')); // get back initial todos from array
  }

  todos.push(todo); // push the new todo into array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get todos from local storage when window is refreshed and display on screen
function getTodos() {

  // check if we already have todo list stored
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = []; // create empty array
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos")); // get back initial todos from array
  }
  todos.forEach(function(todo){
    // create todo div
    const todoDiv = document.createElement("div"); // create a new div tag in the HTML for the new todo
    todoDiv.classList.add("todo"); // add a class called 'todo' to the new div

    // create checkbox 
    const checkbox = document.createElement('input');
    checkbox.type = "radio";
    checkbox.classList.add('complete-button');
    todoDiv.appendChild(checkbox);

    // create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo); // put new todo into the div we created
    todoInput.value = "";

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&times;';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton)

    // append to list in HTML
    todoList.appendChild(todoDiv);

  });
}

// function to remove todo from local storage
function removeLocalTodos(todo) {

  // check if we already have todo list stored
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = []; // create empty array
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos")); // get back initial todos from array
  }

  const todoToDelete = todo.children[1].innerText; // get the text of the todo to delete
  console.log(todoToDelete);
  todos.splice(todos.indexOf(todoToDelete), 1); // get the index of the todo and 'splice' it from the array
  localStorage.setItem('todos', JSON.stringify(todos));
}

// opens and closes side navigation tab
function toggleMenu()
{
  menuButton.classList.toggle('change'); // change menu icon 
  if (menuTask == 1) // open menu
  {
    sideNav.style.width = '250px';
    menuTask = 2; // change to close menu on next click
  }
  else // close menu
  {
    sideNav.style.width = '0px';
    menuTask = 1; // change to open menu on next click
  }

}