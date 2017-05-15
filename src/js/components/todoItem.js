TODO_APP.components.TodoItem = function (root, text) {
  this._root = root;
  this.DOM = {};

  this.addTodo.apply(this, arguments);
  this.init.apply(this, arguments);
};

var TodoItem = TODO_APP.components.TodoItem;

TodoItem.prototype.init = function () {
  this.DOM.$removeBtn.addEventListener('click', this);
  this.DOM.$readyMark.addEventListener('click', this);
  this.DOM.$text.addEventListener('blur', this);
};

TodoItem.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      if (e.target.closest('.todo-item_remove .action_target')) {
        this.removeTodo();
      } else if (e.target.closest('.todo-item_ready-mark .input-checkbox_target')) {
        this.changeReady();
      }
      break;
    case 'blur':
      this.changeText();
      break;
  }
};

TodoItem.prototype.addTodo = function (root, text) {
  this._root.className = 'todo-item';
  this._root.innerHTML =
    '    <div class="input-checkbox todo-item_ready-mark">' +
    '        <input type="checkbox" class="input-checkbox_target" aria-label="Пометить дело как выполненное">' +
    '        <div class="input-checkbox_visual"></div>' +
    '    </div>' +
    '    <div class="todo-item_text-wrapper">' +
    '        <div class="todo-item_text" contenteditable>' + text + '</div>' +
    '    </div>' +
    '    <div class="action todo-item_remove">' +
    '        <button class="action_target" aria-label="Удалить дело"></button>' +
    '        <div class="action_visual"></div>' +
    '    </div>';

  if (list.getActiveFilterType() === 'completed') {
    this._root.style.display = 'none';
  }

  this.DOM.$readyMark = this._root.querySelector('.todo-item_ready-mark .input-checkbox_target');
  this.DOM.$removeBtn = this._root.querySelector('.todo-item_remove .action_target');
  this.DOM.$text = this._root.querySelector('.todo-item_text');
};

TodoItem.prototype.removeTodo = function () {
  list.removeTodo(this);
  return false;
};

TodoItem.prototype.changeReady = function () {
  if (this.DOM.$readyMark.checked) {
    this._root.classList.add('__ready');
    list.setLeftTodosCnt(list.getLeftTodosCnt() - 1);

    if (list.getActiveFilterType() === 'active') {
      this._root.style.display = 'none';
    }
  } else {
    this._root.classList.remove('__ready');
    list.setLeftTodosCnt(list.getLeftTodosCnt() + 1);

    if (list.getActiveFilterType() === 'completed') {
      this._root.style.display = 'none';
    }
  }

  list.updateMarkers();
  return false;
};

TodoItem.prototype.changeText = function () {
  if (this.DOM.$text.innerText.trim() === '') {
    this.removeTodo();
  }
};

TodoItem.prototype.getRoot = function () {
  return this._root;
};

