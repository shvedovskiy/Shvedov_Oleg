let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');
let TodoModel         = require('./TodoModel');

function TodosListModel(itemsData) {
  this._initEventable();

  this._itemIds = 0;
  this._items = itemsData;

  this
    .on('todoChange', this.onChange)
    .on('todoRemove', this.onChange)
    .on('todoAdded', this.onChange);
}

extendConstructor(TodosListModel, Eventable);

TodosListModel.prototype.getList = function () {
  return this._items;
};

TodosListModel.prototype.onChange = function (handler, ctx) {
  handler.call(this, ctx);
  return this;
};

TodosListModel.prototype.add = function (itemData) {
  let model = new TodoModel(Object.assign({id: this._itemIds++}, itemData));
  this._items.push(model);

  this.trigger('changeList', this._items);
  this.trigger('todoAdd', model);
  return this;
};

TodosListModel.prototype.remove = function (id) {

};

TodosListModel.prototype.clearCompleted = function () {

};

module.exports = TodosListModel;
