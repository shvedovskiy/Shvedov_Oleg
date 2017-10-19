import extendConstructor from '../util/extendConstructor';
import Eventable from '../util/Eventable';

/**
 * @param {HTMLElement}root
 * @constructor
 */
export default class Filter {
  constructor(root) {
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

    for (let i = 0, l = this._filters.length; i < l; i++) {
      this._filters[i].addEventListener('click', this);

      if (this._filters[i].classList.contains('__active')) {
        this._activeFilter = this._filters[i];
      }
    }
  }

  /**
   * @param {HTMLElement} filter
   * @callback handleEvent
   * @fires Filter~filterSelect
   * @private
   */
  _onSetFilter(filter) {
    if (this._activeFilter !== filter) {
      this._activeFilter.classList.remove('__active');
      filter.classList.add('__active');

      this._activeFilter = filter;
      /** @event Filter#filterSelect */
      this.trigger('filterSelect', filter.dataset.filter);
    }
    return this;
  }

  handleEvent(e) {
    switch (e.type) {
      case 'click':
        this._onSetFilter(e.target);
        break;
    }
  }
}

extendConstructor(Filter, Eventable);
