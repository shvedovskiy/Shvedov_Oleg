let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');

function TodoModel(data) {
  this._initEventable();

  this._model = {
    id:      data.id,
    isReady: data.isReady || false,
    text:    data.text
  };
}

extendConstructor(TodoModel, Eventable);

TodoModel.prototype.set = function (field, value) {
  this._model[field] = value;
  this._model[field].trigger('modelFieldChange', value);
  return this;
};

TodoModel.prototype.get = function (field) {
  return this._model[field];
};

TodoModel.prototype.onAnyChange = function (handler, ctx) {
  this._model.forEach(function (field) {
    field.on('modelFieldChange', handler.call(ctx));
  });
  this.trigger('modelChange', this);
  return this;
};

TodoModel.prototype.onChange = function (field, handler, ctx) {
  this._model[field].on('modelFieldChange', handler.call(ctx));
  return this;
};

module.exports = TodoModel;
