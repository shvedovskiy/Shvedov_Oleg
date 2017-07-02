let extendConstructor = require('../util/extendConstructor');
let Eventable = require('../util/Eventable');

/**
 * @implements {EventListener}
 * @extends {Eventable}
 * @param {HTMLElement} root
 * @constructor
 */
function TodoAdd(root) {
  this._initEventable();

  this._root = root;
  this._input = root.querySelector('.js-todo-add_input');
  this._selectAllBtn = root.querySelector('.js-todo-add_select-all');

  this._input.addEventListener('keypress', this);
  this._selectAllBtn.addEventListener('click', this);
}

extendConstructor(TodoAdd, Eventable);

/**
 * @callback handleEvent
 * @fires TodoAdd~selectAll
 * @private
 * @returns {Eventable}
 */
TodoAdd.prototype._onSelectAll = function () {
  /** @event TodoAdd#selectAll */
  return this.trigger('selectAll');
};

/**
 * @callback handleEvent
 * @private
 * @fires TodoAdd~todoCreate
 * @returns {Eventable}
 */
TodoAdd.prototype._onTodoAdd = function () {
  let inputText = this._input.value.trim();

  if (inputText.length !== 0) {
    this._input.value = '';
    this._input.blur();

    /** @event TodoAdd#todoCreate */
    return this.trigger('todoCreate', {text: inputText});
  }
};

/**
 * @returns {HTMLElement|*}
 */
TodoAdd.prototype.getRoot = function () {
  return this._root;
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
