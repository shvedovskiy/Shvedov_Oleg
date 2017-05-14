TODO_APP.components.TodoItem = function (root, text) {
  this.root = root;
  this.DOM = {};

  this.addTodo.apply(this, arguments);
  this.init.apply(this, arguments);
};

var TodoItem = TODO_APP.components.TodoItem;

TodoItem.prototype.init = function () {
  this.DOM.$removeBtn.addEventListener('click', this);
  this.DOM.$readyMark.addEventListener('click', this);
};

TodoItem.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      if (e.target.closest('.todo-item_remove .action_target')) {
        this.remove();
      } else if (e.target.closest('.todo-item_ready-mark .input-checkbox_target')) {
        this.changeReady();
      }
      break;
    default:
      break;
  }
};

TodoItem.prototype.addTodo = function (root, text) {
  this.root.className = 'todo-item';
  this.root.innerHTML =
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

  this.DOM.$readyMark = this.root.querySelector('.todo-item_ready-mark .input-checkbox_target');
  this.DOM.$removeBtn = this.root.querySelector('.todo-item_remove .action_target');
  this.DOM.$text = this.root.querySelector('.todo-item_text');

};

TodoItem.prototype.remove = function () {

};

TodoItem.prototype.changeReady = function () {
  if (this.DOM.$readyMark.checked) {
    this.root.classList.add('__ready');
    list.leftTodosCnt -= 1;
  } else {
    this.root.classList.remove('__ready');
    list.leftTodosCnt += 1;
  }
  list.updateMarkers();
};