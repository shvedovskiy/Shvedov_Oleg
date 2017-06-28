let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');

/**
 * @param {HTMLElement}root
 * @constructor
 */
function Filter(root) {
  this._initEventable();

  /**
   * @type {NodeList}
   * @private
   */
  this._filters = root.querySelectorAll('.filter');
  /**
   * @type {HTMLElement}
   * @private
   */
  this._activeFilter = null;

  for (let i = 0; i < this._filters.length; i++) {
    this._filters[i].addEventListener('click', this);

    if (this._filters[i].classList.contains('__active')) {
      this._activeFilter = this._filters[i];
    }
  }
}

extendConstructor(Filter, Eventable);

/**
 * @param {HTMLElement} filter
 * @callback handleEvent
 * @fires Filter~filterSelect
 * @private
 */
Filter.prototype._onSetFilter = function (filter) {
  if (this._activeFilter !== filter) {
    this._activeFilter.classList.remove('__active');
    filter.classList.add('__active');

    this._activeFilter = filter;
    /** @event Filter#filterSelect */
    this.trigger('filterSelect', filter.dataset.filter);
  }
  return this;
};

Filter.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'click':
      this._onSetFilter(e.target);
      break;
  }
};

module.exports = Filter;
