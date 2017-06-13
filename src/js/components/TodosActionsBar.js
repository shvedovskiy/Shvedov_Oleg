let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');
let Filter            = require('./Filter');

function TodosActionsBar() {
  this._initEventable();

  this._counter = document.querySelector('.js-left-counter');
  this._filters = new Filter(document.querySelector('.js-todos-actions-bar_filters'));
  this._clearCompletedBtn = document.querySelector('.js-todos-actions-bar_clear-completed');

  this._filters.on('filterSelected', this._onFilterSelected, this);
  this._clearCompletedBtn.addEventListener('click', this);
}

extendConstructor(TodosActionsBar, Eventable);

TodosActionsBar.prototype._onFilterSelected = function (filterId) {
  return this.trigger('filterSelected', filterId);
};

TodosActionsBar.prototype._onClearCompleted = function () {
  return this.trigger('clearCompleted');
};

TodosActionsBar.prototype.setLeftTodosCount = function (cnt) {
  this._counter.innerHTML = cnt + '&nbsp;' + (cnt === 1 ? 'item' : 'items') + '&nbsp;left';
  return this;
};

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
