TODO_APP.components.TodoAdd = function (root) {
  if (TODO_APP.components.TodoAdd.prototype._instance) {
    return TODO_APP.components.TodoAdd.prototype._instance;
  }
  TODO_APP.components.TodoAdd.prototype._instance = this;
  this._root = root;

  this.DOM = {
    $todoAdd: this._root.querySelector('.todo-add'),
    $selectAllBtn: this._root.querySelector('.todo-add_select-all .action_target'),
    $addForm: this._root.querySelector('.todo-add_input-wrapper'),
    $addInput: this._root.querySelector('.todo-add_input')
  };

  this.init.apply(this, arguments);
};

var TodoAdd = TODO_APP.components.TodoAdd;

TodoAdd.prototype.init = function () {
  this.DOM.$selectAllBtn.addEventListener('click', this);
  this.DOM.$addForm.addEventListener('keypress', this);
};

TodoAdd.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      if (e.target.closest('.todo-add_select-all .action_target')) {
        this.selectAll();
      }
      break;
    case 'keypress':
      if (e.keyCode === 13) {
        this.addTodo(e);
      }
      break;
  }
};

TodoAdd.prototype.selectAll = function () {
  list.selectAll();
  return false;
};

TodoAdd.prototype.addTodo = function (e) {
  var value = this.DOM.$addInput.value;
  if (value === '') {
    e.preventDefault();
    alert('Required field should not be blank');
    return false;
  }
  e.preventDefault();

  this.DOM.$addInput.value = '';
  this.DOM.$addInput.blur();
  var item = list.addTodo(value);

  return false;
};