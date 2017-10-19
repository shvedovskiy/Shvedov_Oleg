import device from './util/deviceDetector';
import TodosListModel from './components/TodosListModel';
import TodosMain from './components/TodoMain';
import TodoAdd from './components/TodoAdd';
import TodosList from './components/TodosList';
import TodosActionsBar from './components/TodosActionsBar';
import appViewState from './views/AppViewState';

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('keydown', handleFirstTab);

function init() {
  if (device.desktop()) {
    document.body.className = 'hover';
  }

  let todosListModel = new TodosListModel();
  const mainRoot = document.querySelector('.main-wrapper');
  let todosMain = new TodosMain(mainRoot);

  let todoAdd         = new TodoAdd(mainRoot.querySelector('.todo-add'));
  let todosList       = new TodosList(mainRoot.querySelector('.js-todos-list'));
  let todosActionsBar = new TodosActionsBar(mainRoot.querySelector('.todos-actions-bar'));

  appViewState.onChange(data => {
    todosList.filterShowedItems(data['filter']);
  });

  todosListModel.onChange(() => {
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
    .on('todoCreate', inputData => {
      todosListModel.add(inputData);
    })
    .on('selectAll', () => {
      todosListModel.selectAll();
    });

  todosListModel
    .on('todoAdd', model => {
      todosList.addTodo(model);
    })
    .on('todoRemove', model => {
      todosList.remove(model);
    })
    .on('todoChange', () => {
      todosList.filterShowedItems();
    });

  todosActionsBar
    .on('clearCompleted', () => {
      todosListModel.clearCompleted();
    })
    .on('filterSelected', filter => {
      appViewState.setFilter(filter);
    });

  todosListModel.updateList();
}

function handleFirstTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
}

function handleMouseDownOnce() {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
}
