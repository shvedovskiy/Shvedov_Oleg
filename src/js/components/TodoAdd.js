let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');

function TodoAdd() {
  this._initEventable();

  this._input = document.querySelector('.js-todo-add_input');
  this._selectAllBtn = document.querySelector('.js-todo-add_select-all');

  this._input.addEventListener('keypress', this);
  this._selectAllBtn.addEventListener('click', this);
}

extendConstructor(TodoAdd, Eventable);

TodoAdd.prototype._onSelectAll = function () {
  return this.trigger('selectAll');
};

TodoAdd.prototype._onTodoAdd = function () {
  let inputText = this._input.value.trim();

  if (inputText.length !== 0) {
    this._input.value = '';
    this._input.blur();
    return this.trigger('todoCreate', {text: inputText});
  }
};

TodoAdd.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      this._onSelectAll();
      break;
    case 'keypress':
      if (e.keyCode === 13) {
        this._onTodoAdd();
      }
      break;
  }
};

module.exports = TodoAdd;
