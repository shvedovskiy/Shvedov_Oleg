if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

document.addEventListener('DOMContentLoaded', init);

let TodosListModel  = require('./components/TodosListModel');
let TodosMain       = require('./components/TodoMain');
let TodoAdd         = require('./components/TodoAdd');
let TodosList       = require('./components/TodosList');
let TodosActionsBar = require('./components/TodosActionsBar');
let appViewState    = require('./views/AppViewState');

function init() {
  let todosListModel = new TodosListModel([]);

  const mainRoot = document.querySelector('.main-wrapper');
  let todosMain = new TodosMain(mainRoot);

  let todoAdd         = new TodoAdd(mainRoot.querySelector('.todo-add'));
  let todosList       = new TodosList(mainRoot.querySelector('.js-todos-list'));
  let todosActionsBar = new TodosActionsBar(mainRoot.querySelector('.todos-actions-bar'));

  appViewState.onChange(function (data) {
    todosList.filterShowedItems(data['filter']);
  });

  todosListModel.onChange(function () {
    if (todosListModel.getList().length !== 0) {
      todosMain.updateInterfaceVisibility(true);
    } else {
      todosMain.updateInterfaceVisibility(false);
    }

    let leftTodosCnt = todosListModel.getLeftTodosCount();
    todosActionsBar.setLeftTodosCount(leftTodosCnt);

    if (todosListModel.getList().length - leftTodosCnt > 0) {
      todosActionsBar.manageClearCompletedVisibility(true);
    } else {
      todosActionsBar.manageClearCompletedVisibility(false);
    }
  });

  todoAdd
    .on('todoCreate', function(inputData) {
      todosListModel.add(inputData);
    })
    .on('selectAll', function() {
      todosListModel.getList().forEach(function (model) {
        model.set('isReady', true);
      })
    });

  todosListModel
    .on('todoAdd', function (model) {
      todosList.addTodo(model);
    })
    .on('todoRemove', function (model) {
      todosList.remove(model);
    })
    .on('todoChange', function () {
      todosList.filterShowedItems();
    });

  todosActionsBar
    .on('clearCompleted', function () {
      todosListModel.clearCompleted();
    })
    .on('filterSelected', function (filter) {
      appViewState.setFilter(filter);
    });
}
