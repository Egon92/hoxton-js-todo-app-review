// How to work with state:
// 1. create some state
// 2. render the app based on the state
// 3. update the state
// 4. rerender the app based on the new state


const state = {
    todos: [{
            title: "Buy milk",
            completed: true
        },
        {
            title: "Buy vegetables",
            completed: false
        },
        {
            title: "Cook dinner",
            completed: true
        },
        {
            title: "Wash dishes",
            completed: false
        }
    ],
    showCompleted: true
}

// create a todo li element

/* <li class="todo">
    <div class="completed-section">
      <input class="completed-checkbox" type="checkbox" />
    </div>
    <div class="text-section">
      <p class="text">Go shopping</p>
    </div>
    <div class="button-section">
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  </li> */


const todoUl = document.querySelector(".todo-list")
const completedUl = document.querySelector(".completed-list")
const showCompletedCheckbox = document.querySelector(".show-completed-checkbox")
const addForm = document.querySelector(".add-item")
const addFormInput = document.querySelector(".text-input")

addForm.addEventListener("submit", function (event) {
    event.preventDefault()

    addTodo(addFormInput.value)
    addFormInput.value = ''
    render()
})

function deleteTodo(todo) {
    state.todos = state.todos.filter(function (todo1) {
        return todo1.title !== todo.title
    })
}



showCompletedCheckbox.addEventListener("click", function () {
    state.showCompleted = !state.showCompleted
    if (!state.showCompleted) {
        completedUl.style.display = "none"
    } else {
        completedUl.style.display = "block"
    }
    render()
})

function createIncompleteTodo(todo) {

    const todoLi = document.createElement("li")
    todoLi.setAttribute("class", "todo")

    const completedSectionDiv = document.createElement("div")
    completedSectionDiv.setAttribute("class", "completed-section")

    const inputCheckbox = document.createElement('input')
    inputCheckbox.setAttribute('class', 'completed-checkbox')
    inputCheckbox.setAttribute('type', 'checkbox')
    inputCheckbox.checked = todo.completed
    inputCheckbox.addEventListener("click", function () {

        todo.completed = !todo.completed
        render()
    })

    const buttonSectionDiv = document.createElement('div')
    buttonSectionDiv.setAttribute('class', 'button-section')
    const editButton = document.createElement('button')
    editButton.setAttribute('class', 'edit')
    editButton.textContent = 'Edit'
    // editButton.addEventListener("click", function (){
    //     createNewListItem(todo)
    // })
    editButton.addEventListener('click', function () {

        const input = createNewListItem(todo)
        todoLi.innerHTML = '';
        todoLi.append(input);

    })
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'delete')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener("click", function () {
        deleteTodo(todo)
        render()
    })


    const textSectionDiv = document.createElement('div')
    textSectionDiv.setAttribute('class', 'text-section')

    const paragraphInsideDiv = document.createElement('p')

    paragraphInsideDiv.textContent = todo.title


    completedSectionDiv.append(inputCheckbox)
    textSectionDiv.append(paragraphInsideDiv)
    buttonSectionDiv.append(editButton, deleteButton)
    todoLi.append(completedSectionDiv, textSectionDiv, buttonSectionDiv)
    todoUl.append(todoLi)

}

function createCompleteTodo(todo) {

    const todoLi = document.createElement("li")
    todoLi.setAttribute("class", "todo completed")

    const completedSectionDiv = document.createElement("div")
    completedSectionDiv.setAttribute("class", "completed-section")

    const inputCheckbox = document.createElement('input')
    inputCheckbox.setAttribute('class', 'completed-checkbox')
    inputCheckbox.setAttribute('type', 'checkbox')
    inputCheckbox.checked = todo.completed
    inputCheckbox.addEventListener("click", function () {

        todo.completed = !todo.completed
        render()
    })

    const buttonSectionDiv = document.createElement('div')
    buttonSectionDiv.setAttribute('class', 'button-section')
    const editButton = document.createElement('button')
    editButton.setAttribute('class', 'edit')
    editButton.textContent = 'Edit'
    editButton.addEventListener('click', function () {

        const input = createNewListItem(todo)
        todoLi.innerHTML = '';
        todoLi.append(input);

    })
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'delete')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener("click", function () {
        deleteTodo(todo)
        render()
    })
    const textSectionDiv = document.createElement('div')
    textSectionDiv.setAttribute('class', 'text-section')

    const paragraphInsideDiv = document.createElement('p')
    paragraphInsideDiv.setAttribute('class', 'text')
    paragraphInsideDiv.textContent = todo.title


    completedSectionDiv.append(inputCheckbox)
    textSectionDiv.append(paragraphInsideDiv)
    buttonSectionDiv.append(editButton, deleteButton)
    todoLi.append(completedSectionDiv, textSectionDiv, buttonSectionDiv)
    completedUl.append(todoLi)

}

function render() {
    todoUl.innerHTML = ""
    completedUl.innerHTML = ""
    renderIncompleteTodos()
    renderCompleteTodos()
}

function renderIncompleteTodos() {

    const incompleteTodos = state.todos.filter(function (todo) {
        return !todo.completed
    })
    for (const todo of incompleteTodos) {
        createIncompleteTodo(todo)
    }
}

function renderCompleteTodos() {

    const completeTodos = state.todos.filter(function (todo) {
        return todo.completed
    })
    for (const todo of completeTodos) {
        createCompleteTodo(todo)
    }
}

function addTodo(todoTitle) {
    state.todos.push({
        title: todoTitle,
        completed: false
    })
}


//Prej ktu
function createNewListItem(item) {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'todo');
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    const inputTitle = document.createElement('input');
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';

    wrapper.append(inputTitle, addButton, cancelButton);
    listItem.append(wrapper);


    addButton.addEventListener('click', function () {
        const inputValue = inputTitle.value;
        editTodo(item, inputValue);
        createIncompleteTodo(item);
        render();
    })
    cancelButton.addEventListener('click', function () {
        // createTodoListItem(item);
        render();
    })
    return listItem;
    //   todoUl.append(listItem)
}
render()

function editTodo(todo, name) {
    todo.title = name;
}