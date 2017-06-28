let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');

function AppViewState() {
  this._initEventable();

  this.filter = 'all';
}

extendConstructor(AppViewState, Eventable);

AppViewState.prototype.onChange = function(handler, ctx) {
  this.on('filterChanged', function (filterName) {
    handler.call(ctx, {filter: filterName});
  });
};

AppViewState.prototype.setFilter = function(filterName) {
  this.filter = filterName;
  this.trigger('filterChanged', filterName);
  return this;
};

AppViewState.prototype.getFilter = function () {
  return this.filter;
};

let appViewState = new AppViewState();

module.exports = appViewState;
