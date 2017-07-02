let extendConstructor = require('../util/extendConstructor');
let Eventable = require('../util/Eventable');
let Filter = require('./Filter');

/**
 * @implements {EventListener}
 * @param root
 * @constructor
 */
function TodosActionsBar(root) {
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

extendConstructor(TodosActionsBar, Eventable);

/**
 * @callback handleEvent
 * @fires TodosActionsBar~filterSelected
 * @private
 * @returns {Eventable}
 */
TodosActionsBar.prototype._onFilterSelected = function (filterName) {
  /** @event TodosActionsBar#filterSelected */
  return this.trigger('filterSelected', filterName);
};

/**
 * @callback handleEvent
 * @fires TodosActionsBar~clearCompleted
 * @private
 * @returns {Eventable}
 */
TodosActionsBar.prototype._onClearCompleted = function () {
  /** @event TodosActionsBar#clearCompleted */
  return this.trigger('clearCompleted');
};

/**
 * @param {Number} cnt
 * @returns {TodosActionsBar}
 */
TodosActionsBar.prototype.setLeftTodosCount = function (cnt) {
  this._counter.innerHTML = cnt + '&nbsp;' + (cnt === 1 ? 'item' : 'items') + '&nbsp;left';
  return this;
};

/**
 * @param {Boolean} isVisible
 * @returns {TodosActionsBar}
 */
TodosActionsBar.prototype.manageClearCompletedVisibility = function(isVisible) {
  if (isVisible) {
    this._clearCompletedBtn.classList.remove('__hide');
  } else {
    this._clearCompletedBtn.classList.add('__hide');
  }
  return this;
};

TodosActionsBar.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      this._onClearCompleted();
      break;
  }
};

module.exports = TodosActionsBar;
