const DOM = {
  $main: document.querySelector('.todos-main'),
  $addFormElement: document.forms[0],
  $markAll: document.getElementById('todo-add_select-all'),
  $todosList: document.querySelector('.todos-list'),
  $readyItems: document.querySelectorAll('.todo-item.__ready'),
  $doneMarkers: document.querySelectorAll('.todo-item_ready-mark'),
  $actionsBar: document.querySelector('.todos-actions-bar'),
  $leftCounter: document.getElementById('todos-actions-bar_counter'),
  $clearAll: document.getElementById('todos-actions-bar_clear-completed'),
};

const globals = {
  allTasks: 0,
  completed: 0,
};


function updateEmptyVisibility() {
  DOM.$main.classList.toggle('__empty');
  DOM.$actionsBar.style.display = (DOM.$actionsBar.style.display === 'none') ? 'block' : 'none';
}


function updateMarkers() {
  DOM.$leftCounter.innerText = `${globals.allTasks - globals.completed} item(s) left`;
}


function addTodo(e) {
  const input = this.elements[0];
  if (input.value === '') { /* add required checking fof safari */
    e.preventDefault();
    alert('Required field should not be blank.');
    return false;
  }
  e.preventDefault();

  const item = document.createElement('li');
  item.className = 'todo-item';
  item.innerHTML =
    `<div class="todo-item_checkbox-wrapper">
       <input type="checkbox" class="todo-item_ready-mark" aria-label="Пометить дело как выполненное">
       <div class="todo-item_ready-mark_visual"></div>
     </div>
     <div class="todo-item_text-wrapper">
       <div class="todo-item_text">${input.value}</div>
     </div>
     <div class="todo-item_remove-wrapper">
       <button class="todo-item_remove" aria-label="Удалить дело"></button>
       <div class="todo-item_remove_visual"></div>
     </div>`;
  DOM.$todosList.children[0].appendChild(item);

  if (globals.allTasks === 0) {
    updateEmptyVisibility();
  }
  globals.allTasks += 1;
  updateMarkers();

  input.value = '';
  input.blur();

  return false;
}


function markAll() {
  if (this.checked) {
    globals.completed = globals.allTasks;
  } else {
    globals.completed = DOM.$readyItems.length;
  }
  updateMarkers();
}

function doneTodo() {
  return 0;
}

function clearAll() {
  for (let i = 0; i < DOM.$readyItems.length; i += 1) {
    DOM.$readyItems[i].parentNode().removeChild(DOM.$readyItems[i]);
  }
  updateMarkers();
}


function todos() {
  if (globals.allTasks > 0) {
    updateEmptyVisibility();
  }
  updateMarkers();
  DOM.$addFormElement.onsubmit = addTodo;
  DOM.$markAll.onchange = markAll;
  DOM.$doneMarkers.onchange = doneTodo;
  DOM.$clearAll.onclick = clearAll;
}


document.addEventListener('DOMContentLoaded', todos);
