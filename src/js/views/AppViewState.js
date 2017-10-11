import extendConstructor from '../util/extendConstructor';
import Eventable from '../util/Eventable';

class AppViewState {
  constructor() {
    this._initEventable();
    this.filter = 'all';
  }

  onChange(handler, ctx) {
    this.on('filterChanged', filterName => {
      handler.call(ctx, { filter: filterName });
    });
  }

  setFilter(filterName) {
    this.filter = filterName;
    this.trigger('filterChanged', filterName);
    return this;
  }

  getFilter() {
    return this.filter;
  }
}

extendConstructor(AppViewState, Eventable);
const appViewState = new AppViewState();

export default appViewState;
