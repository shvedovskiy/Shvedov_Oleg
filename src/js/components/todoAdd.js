TODO_APP.components.TodoAdd = function (root) {
  if (TODO_APP.components.TodoAdd.prototype._instance) {
    return TODO_APP.components.TodoAdd.prototype._instance;
  }
  TODO_APP.components.TodoAdd.prototype._instance = this;

  this.root = root;

  this.DOM = {
    $todoAdd: this.root.querySelector('.todo-add'),
    $selectAllBtn: this.root.querySelector('.todo-add_select-all .action_target'),
    $addForm: document.forms[0],
    $addInput: document.forms[0].elements[0]
  };

  this.init.apply(this, this.root);
};

var TodoAdd = TODO_APP.components.TodoAdd;

TodoAdd.prototype.init = function () {
  this.DOM.$selectAllBtn.addEventListener('click', this);
  this.DOM.$addForm.addEventListener('submit', this);
};

TodoAdd.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      if (e.target.closest('.todo-add_select-all .action_target')) {
        this.selectAll();
      }
      break;
    case 'submit':
      this.addTodo(e);
      break;
  }
};

TodoAdd.prototype.selectAll = function () {

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