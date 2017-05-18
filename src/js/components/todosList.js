TODO_APP.components.TodosList = function (root) {
  if (TODO_APP.components.TodosList.prototype._instance) {
    return TODO_APP.components.TodosList.prototype._instance;
  }

  TODO_APP.components.TodosList.prototype._instance = this;
  this._root = root;
  this._allTodosCnt = 0;
  this._leftTodosCnt = 0;
  this._list = []; // TodoItem objects, not Nodes

  this.DOM = {
    $mainWrapper: this._root.querySelector('.todos-main'),
    $todosList: this._root.querySelector('.todos-list'),
    $actionsBar: this._root.querySelector('.todos-actions-bar'),
    $counter: this._root.querySelector('.js-left-counter'),
    $clearCompletedBtn: this._root.querySelector('.todos-actions-bar_clear-completed'),
    $filterBtns: this._root.querySelectorAll('.todos-filters .filter')
  };

  this.init.apply(this, arguments);
};

var TodosList = TODO_APP.components.TodosList;

TodosList.prototype.init = function () {
  this.updateMarkers();
  this.DOM.$clearCompletedBtn.addEventListener('click', this);
  for (var i = 0; i < this.DOM.$filterBtns.length; i += 1) {
    this.DOM.$filterBtns[i].addEventListener('click', this);
  }
};

TodosList.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      if (e.target.closest('.todos-actions-bar_clear-completed')) {
        this.removeAllCompleted();
      } else if (e.target.closest('.filter')) {
        this.changeFilter(e.target);
      }
      break;
  }
};

TodosList.prototype.addTodo = function (text) {
  if (this._allTodosCnt > 0) {

  } else {
    this.DOM.$mainWrapper.classList.remove('__empty');
  }

  var item = new TodoItem(document.createElement('div'), text);

  this._list.push(item);
  this.DOM.$todosList.appendChild(item._root);
  this._allTodosCnt += 1;
  this._leftTodosCnt += 1;
  this.updateMarkers();

  return item._root;
};

TodosList.prototype.removeTodo = function (elem) {
  var idx = this._list.indexOf(elem);
  if (idx !== -1) {
    this._list.splice(idx, 1);
  }

  this.DOM.$todosList.removeChild(elem._root);

  if (!elem._root.classList.contains('__ready')) {
    this._leftTodosCnt -= 1;
  }
  this._allTodosCnt -= 1;
  this.updateMarkers();

  return false;
};

TodosList.prototype.removeAllCompleted = function () {
  var currentList = this._list.slice();
  for (var i = 0; i < currentList.length; i += 1) {
    if (currentList[i]._root.classList.contains('__ready')) {
      currentList[i].removeTodo();
    }
  }
  this.updateMarkers();
  return false;
};

TodosList.prototype.updateMarkers = function () {
  this.DOM.$counter.innerText = this._leftTodosCnt;

  if (this._allTodosCnt === 0) {
    this.DOM.$clearCompletedBtn.style.visibility = 'hidden';
    this.DOM.$mainWrapper.classList.add('__empty');
    this.DOM.$filterBtns[0].classList.add('__active');
  } else {
    this.DOM.$mainWrapper.classList.remove('__empty');

    if (this._allTodosCnt - this._leftTodosCnt > 0) {
      this.DOM.$clearCompletedBtn.style.visibility = 'visible';
    } else {
      this.DOM.$clearCompletedBtn.style.visibility = 'hidden';
    }
  }
};

TodosList.prototype.selectAll = function () {
  var i;
  for (i = 0; i < this._list.length; i += 1) {
    if (!this._list[i]._root.classList.contains('__ready')) {
      this._list[i]._root.classList.add('__ready');
      this._list[i].DOM.$readyMark.checked = true;
    }
  }

  if (this.getActiveFilterType() === 'active') {
    var todos = this._root.querySelectorAll('.todo-item');
    for (i = 0; i < todos.length; i += 1) {
      todos[i].style.display = 'none';
    }
  } else if (this.getActiveFilterType() === 'completed') {
    var todos = this._root.querySelectorAll('.todo-item');
    for (i = 0; i < todos.length; i += 1) {
      todos[i].style.display = 'flex';
    }
  }

  this._leftTodosCnt = 0;
  this.updateMarkers();

  return false;
};

TodosList.prototype.changeFilter = function(filter) {
  var oldFilter = this._root.querySelector('.todos-filters .filter.__active');
  oldFilter.classList.remove('__active');

  filter.classList.add('__active');
  var i;

  if (filter.dataset.filter === 'all') {
    var todoItems = this._root.querySelectorAll('.todo-item');
    for (i = 0; i < todoItems.length; i += 1) {
      todoItems[i].style.display = 'flex';
    }
  } else if (filter.dataset.filter === 'active') {
    var unreadyTodoItems =  this._root.querySelectorAll('.todo-item:not(.__ready)');
    var readyTodoItems =  this._root.querySelectorAll('.todo-item.__ready');

    for (i = 0; i < unreadyTodoItems.length; i += 1) {
      unreadyTodoItems[i].style.display = 'flex';
    }
    for (i = 0; i < readyTodoItems.length; i += 1) {
      readyTodoItems[i].style.display = 'none';
    }
  } else if (filter.dataset.filter === 'completed') {
    var unreadyTodoItems =  this._root.querySelectorAll('.todo-item:not(.__ready)');
    var readyTodoItems =  this._root.querySelectorAll('.todo-item.__ready');

    for (i = 0; i < readyTodoItems.length; i += 1) {
      readyTodoItems[i].style.display = 'flex';
    }
    for (i = 0; i < unreadyTodoItems.length; i += 1) {
      unreadyTodoItems[i].style.display = 'none';
    }
  }
  return false;
};

TodosList.prototype.getAllTodosCnt = function () {
  return this._allTodosCnt;
};

TodosList.prototype.setAllTodosCnt = function (value) {
  this._allTodosCnt = value;
};

TodosList.prototype.getLeftTodosCnt = function () {
  return this._leftTodosCnt;
};

TodosList.prototype.setLeftTodosCnt = function (value) {
  this._leftTodosCnt = value;
};

TodosList.prototype.getActiveFilterType = function () {
  return this._root.querySelector('.todos-filters .filter.__active').dataset.filter;
};