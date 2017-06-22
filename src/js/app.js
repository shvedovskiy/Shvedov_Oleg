document.addEventListener('DOMContentLoaded', init);

let TodosListModel  = require('./components/TodosListModel');
let TodosMain       = require('./components/TodoMain');
let TodoAdd         = require('./components/TodoAdd');
let TodosList       = require('./components/TodosList');
let TodosActionsBar = require('./components/TodosActionsBar');

function init() {
  let todosListModel = new TodosListModel([]);

  const mainRoot = document.querySelector('.main-wrapper');
  let todosMain = new TodosMain(mainRoot);

  let todoAdd         = new TodoAdd(mainRoot.querySelector('.todo-add'));
  let todosList       = new TodosList(mainRoot.querySelector('.js-todos-list'));
  let todosActionsBar = new TodosActionsBar(mainRoot.querySelector('.todos-actions-bar'));

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

  todosListModel.onChange(function () {
    if (todosListModel.getList().length !== 0) {
      todosMain.updateMarkers(true);
    } else {
      todosMain.updateMarkers(false);
    }

    let leftTodosCnt = todosList.getLeftTodosCount();
    todosActionsBar.setLeftTodosCount(leftTodosCnt);

    if (todosListModel.getList().length - leftTodosCnt > 0) {
      todosActionsBar.manageClearCompletedVisibility(true);
    } else {
      todosActionsBar.manageClearCompletedVisibility(false);
    }
  });

  todoAdd
    .on('todoCreate', function(data) {
      todosListModel.add(data);
    })
    .on('selectAll', function() {
      //todosList.selectAll();
      //updateClearCompleted();
      todosListModel.getList().forEach(function (model) {
        model.set('isReady', true);
      })
    });

  todosListModel
    .on('todoAdd', function (model) {
      todosList.createTodo(model);
    })
    .on('remove', function (model) {
      todosList.remove(model);
    });

  todosList
    .on('todoAdded', function() {
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
      //todosList.clearCompleted();
      //updateClearCompleted();
      todosListModel.clearCompleted();
    })
    .on('filterSelected', function (filter) {
      todosList.setFilter(filter);
    });
}
