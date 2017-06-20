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
  return this;
};

TodoModel.prototype.get = function (field) {
  return this._model[field];
};

TodoModel.prototype.onAnyChange = function (handler, ctx) {
};

TodoModel.prototype.onChange = function (field, handler, ctx) {

};

module.exports = TodoModel;
