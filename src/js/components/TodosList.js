import extendConstructor from '../util/extendConstructor';
import Eventable from '../util/Eventable';
import TodoItem from './TodoItem';
import appViewState from '../views/AppViewState';

/**
 * @extends {Eventable}
 * @param {HTMLElement} root
 * @constructor
 */
export default class TodosList {
  constructor(root) {
    this._initEventable();

    this._root = root;
    /**
     * @type {Array.<TodoItem>}
     * @private
     *
     */
    this._items = [];
    this._left = 0;
  }

  /**
   * @returns {Number}
   */
  getTodosCount() {
    return this._items.length;
  }

  /**
   * @param {TodoModel} model
   * @returns {TodosList}
   */
  addTodo(model) {
    let item = new TodoItem(model);
    this._items.push(item);

    item
      .on('todoChange', this._onTodoChange, this)
      .render(this._root);

    this.filterShowedItems();
    return this;
  }

  /**
   * @returns {TodosList}
   */
  clearCompleted() {
    for (let i = 0, l = this._items.length; i !== l; i++) {
      if (this._items[i]._model.get('isReady')) {
        this._items[i].remove();
      }
    }
    return this;
  }

  /**
   * @param {Number} id
   * @returns {TodoItem}
   * @private
   */
  _getItemById(id) {
    for (let i = 0, l = this._items.length; i !== l; i++) {
      if (this._items[i]._model.get('id') === id) {
        return this._items[i];
      }
    }
    return null;
  }

  /**
   * @callback addTodo
   * @private
   * @returns {TodosList}
   */
  _onTodoChange() {
    this.filterShowedItems(appViewState.getFilter());
    return this;
  }

  /**
   * @param {TodoModel} model
   * @returns {TodosList}
   */
  remove(model) {
    let item = this._getItemById(model.get('id'));
    if (item) {
      item.off('todoChange', this._onTodoChange, this);
      item.remove();
      let itemIndex = this._items.indexOf(item);
      this._items.splice(itemIndex, 1);
    }

    return this;
  }

  /**
   * @returns {TodosList}
   */
  selectAll() {
    this._items.forEach(item => {
      item.changeReady(true);
    });
    return this;
  }

  /**
   * @param {String} [filter]
   * @returns {TodosList}
   */
  filterShowedItems(filter) {
    if (!filter) {
      filter = appViewState.getFilter();
    }

    this._items.forEach(item => {
      switch (filter) {
        case 'all':
          item.visible(true);
          break;
        case 'completed':
          item.visible(item._model.get('isReady'));
          break;
        case 'active':
          item.visible(!item._model.get('isReady'));
          break;
      }
    });
    return this;
  }

  /**
   * @returns {HTMLElement|*}
   */
  getRoot() {
    return this._root;
  }
}
extendConstructor(TodosList, Eventable);
