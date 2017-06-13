document.addEventListener('DOMContentLoaded', init);

let TodosMain       = require('./components/TodoMain');
let TodoAdd         = require('./components/TodoAdd');
let TodosList       = require('./components/TodosList');
let TodosActionsBar = require('./components/TodosActionsBar');

function init() {
  let todosMain       = new TodosMain();
  let todoAdd         = new TodoAdd();
  let todosList       = new TodosList();
  let todosActionsBar = new TodosActionsBar();

  function updateLeftTodosCount() {
    let todosCnt     = todosList.getTodosCount();
    let leftTodosCnt = todosList.getLeftTodosCount();

    if (todosCnt !== 0) {
      todosMain.updateMarkers(true);
    } else {
      todosMain.updateMarkers(false);
    }

    todosActionsBar.setLeftTodosCount(leftTodosCnt);
  }

  function updateClearCompleted() {
    let todosCnt     = todosList.getTodosCount();
    let leftTodosCnt = todosList.getLeftTodosCount();

    if (todosCnt - leftTodosCnt > 0) {
      todosActionsBar.manageClearCompletedVisibility(true);
    } else {
      todosActionsBar.manageClearCompletedVisibility(false);
    }
  }

  todoAdd
    .on('todoCreate', function(data) {
      todosList.createTodo(data);
    })
    .on('selectAll', function() {
      todosList.selectAll();
      updateClearCompleted();
    });

  todosList
    .on('todoAdd', function() {
      updateLeftTodosCount();
      todosList.setFilter();
    })
    .on('todoRemove', function() {
      updateClearCompleted();
      updateLeftTodosCount();
    })
    .on('todoChange', function () {
      updateClearCompleted();
      updateLeftTodosCount();
    });

  todosActionsBar
    .on('clearCompleted', function () {
      todosList.clearCompleted();
      updateClearCompleted();
    })
    .on('filterSelected', function (filter) {
      todosList.setFilter(filter);
    });
}
