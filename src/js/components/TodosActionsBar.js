import extendConstructor from '../util/extendConstructor';
import Eventable from '../util/Eventable';
import Filter from './Filter';

/**
 * @implements {EventListener}
 * @param root
 * @constructor
 */
export default class TodosActionsBar {
  constructor(root) {
    this._initEventable();

    /**
     * @type {HTMLElement}
     * @private
     */
    this._root = root;
    this._counter = root.querySelector('.js-left-counter');
    this._clearCompletedBtn = root.querySelector('.js-todos-actions-bar_clear-completed');
    this._filters = new Filter(root.querySelector('.js-todos-actions-bar_filters'));

    this._filters.on('filterSelect', this._onFilterSelected, this);

    this._clearCompletedBtn.addEventListener('click', this);
  }

  /**
   * @callback handleEvent
   * @fires TodosActionsBar~filterSelected
   * @private
   * @returns {Eventable}
   */
  _onFilterSelected(filterName) {
    /** @event TodosActionsBar#filterSelected */
    return this.trigger('filterSelected', filterName);
  }

  /**
   * @callback handleEvent
   * @fires TodosActionsBar~clearCompleted
   * @private
   * @returns {Eventable}
   */
  _onClearCompleted() {
    /** @event TodosActionsBar#clearCompleted */
    return this.trigger('clearCompleted');
  }

  /**
   * @param {Number} cnt
   * @returns {TodosActionsBar}
   */
  setLeftTodosCount(cnt) {
    this._counter.innerHTML = `${cnt}&nbsp;${(cnt === 1 ? 'item' : 'items')}&nbsp;left`;
    return this;
  }

  /**
   * @param {Boolean} isVisible
   * @returns {TodosActionsBar}
   */
  manageClearCompletedVisibility(isVisible) {
    if (isVisible) {
      this._clearCompletedBtn.classList.remove('__hide');
    } else {
      this._clearCompletedBtn.classList.add('__hide');
    }
    return this;
  }

  handleEvent(e) {
    switch (e.type) {
      case 'click':
        this._onClearCompleted();
        break;
    }
  }
}

extendConstructor(TodosActionsBar, Eventable);
