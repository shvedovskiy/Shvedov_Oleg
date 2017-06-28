let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');

/**
 * @param {Object} data
 * @constructor
 */
function TodoModel(data) {
  this._initEventable();

  this._model = {
    id:      data.id,
    isReady: data.isReady || false,
    text:    data.text
  };
}

extendConstructor(TodoModel, Eventable);

/**
 * @param {String} field
 * @param {*} value
 * @fires TodoModel#modelFieldChange
 * @returns {TodoModel}
 */
TodoModel.prototype.set = function (field, value) {
  this._model[field] = value;
  /** @event TodoModel~modelFieldChange */
  this.trigger('modelFieldChange', {field: field, value: value});

  return this;
};

/**
 * @param {String} field
 * @returns {*}
 */
TodoModel.prototype.get = function (field) {
  return this._model[field];
};

/**
 * @param {String} field
 * @param {Function} handler
 * @param {Object} ctx
 * @returns {TodoModel}
 */
TodoModel.prototype.onChange = function (field, handler, ctx) {
  this.on('modelFieldChange', function(data) {
    if (data.field === field) {
      handler.call(ctx, data);
    }
  }, this);

  return this;
};

/**
 * @param {Function} handler
 * @param {Object} ctx
 * @returns {TodoModel}
 */
TodoModel.prototype.onAnyChange = function (handler, ctx) {
  this.on('modelFieldChange', function (data) {
    if (data['field'] !== 'text') { // костыль :sad:
      handler.call(ctx, data);
      this.trigger('modelChange', this);
    }
  }, this);

  return this;
};

module.exports = TodoModel;
