TODO_APP.components.TodosList = function (root) {
  if (TODO_APP.components.TodosList.prototype._instance) {
    return TODO_APP.components.TodosList.prototype._instance;
  }

  TODO_APP.components.TodosList.prototype._instance = this;

  this.root = root;
  this.allTodosCnt = 0;
  this.leftTodosCnt = 0;


  this.DOM = {
    $mainWrapper: root.querySelector('.todos-main'),
    $todosList: root.querySelector('.todos-list'),
    $actionsBar: root.querySelector('.todos-actions-bar'),
    $counter: root.querySelector('.js-left-counter'),
    $clearCompletedBtn: root.querySelector('.todos-actions-bar_clear-completed')
  };

  this.init.apply(this, arguments);
};

var TodosList = TODO_APP.components.TodosList;

TodosList.prototype.init = function () {
  if (this.allTodosCnt > 0) {
    this.DOM.$mainWrapper.classList.remove('__empty');
  } else {
    this.DOM.$mainWrapper.classList.add('__empty');
  }

  this.DOM.$counter.innerText = this.leftTodosCnt;

  return this;
};

TodosList.prototype.addTodo = function (text) {
  if (this.allTodosCnt > 0) {

  } else {
    this.DOM.$mainWrapper.classList.remove('__empty');
  }

  var item = new TodoItem(document.createElement('div'), text).root;
  this.DOM.$todosList.appendChild(item);

  this.allTodosCnt += 1;
  this.leftTodosCnt += 1;
  this.updateMarkers();

  return item;
};

TodosList.prototype.updateMarkers = function () {
  this.DOM.$counter.innerText = this.leftTodosCnt;
  if (this.allTodosCnt - this.leftTodosCnt > 0) {
    this.DOM.$clearCompletedBtn.style.visibility = 'visible';
  } else {
    this.DOM.$clearCompletedBtn.style.visibility = 'hidden';
  }
};