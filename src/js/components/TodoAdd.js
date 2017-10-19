import extendConstructor from '../util/extendConstructor';
import Eventable from '../util/Eventable';

/**
 * @implements {EventListener}
 * @extends {Eventable}
 * @param {HTMLElement} root
 * @constructor
 */
export default class TodoAdd {
  constructor(root) {
    this._initEventable();

    this._root = root;
    this._input = root.querySelector('.js-todo-add_input');
    this._selectAllBtnWrapper = root.querySelector('.todo-add_select-all');
    this._selectAllBtn = root.querySelector('.js-todo-add_select-all');

    this._input.addEventListener('keypress', this);
    this._selectAllBtnWrapper.addEventListener('keypress', this);
    this._selectAllBtn.addEventListener('click', this);
  }

  /**
   * @callback handleEvent
   * @fires TodoAdd~selectAll
   * @private
   * @returns {Eventable}
   */
  _onSelectAll() {
    /** @event TodoAdd#selectAll */
    return this.trigger('selectAll');
  }

  /**
   * @callback handleEvent
   * @private
   * @fires TodoAdd~todoCreate
   * @returns {Eventable}
   */
  _onTodoAdd() {
    let inputText = this._input.value.trim();

    if (inputText.length !== 0) {
      this._input.value = '';
      this._input.blur();

      /** @event TodoAdd#todoCreate */
      return this.trigger('todoCreate', { text: inputText });
    }
  }

  /**
   * @returns {HTMLElement|*}
   */
  getRoot() {
    return this._root;
  }

  handleEvent(e) {
    switch (e.type) {
      case 'click':
        this._onSelectAll();
        break;
      case 'keypress':
        if (e.keyCode === 13) {
          if (e.target.closest('.js-todo-add_input')) {
            this._onTodoAdd();
          } else if (e.target.closest('.todo-add_select-all')) {
            this._onSelectAll();
          }
        }
        break;
    }
  }
}

extendConstructor(TodoAdd, Eventable);
