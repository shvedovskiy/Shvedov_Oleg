let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');
let TodoItem          = require('./TodoItem');

function TodosList(root) {
  this._initEventable();

  this._root = root;
  //this._itemIds = 0;
  this._items   = [];
  this._left    = 0;
  this._filter  = 'all';
}

extendConstructor(TodosList, Eventable);

TodosList.prototype.getTodosCount = function () {
  return this._items.length;
};

TodosList.prototype.getLeftTodosCount = function () {
  return this._left;
};

TodosList.prototype.createTodo = function (model) {
  let item = new TodoItem(Object.assign({}, model));

  if (!item.model.get('isReady')) {
    this._left += 1;
  }
  this._items.push(item);

  item
    .on('todoChange', this._onTodoChange, this)
    .on('todoRemove', this._onTodoRemove, this)
    .render(this._root);

  this.trigger('todoAdded', item);
  return this;
};

TodosList.prototype.clearCompleted = function () {
  for (let i = this._items.length; i--;) {
    if (this._items[i].model.get('isReady')) {
      this._items[i].remove();
    }
  }
  return this;
};

TodosList.prototype._getItemById = function (id) {
  for (let i = this._items.length; i--;) {
    if (this._items[i].model.get('id') === id) {
      return this._items[i];
    }
  }
  return null;
};

TodosList.prototype._onTodoChange = function (model) {
  if (model.isReady) {
    this._left -= 1;
  } else {
    this._left += 1;
  }

  this.filterShowedItems(this._filter);
  this.trigger('todoChange', this);
};

TodosList.prototype._onTodoRemove = function (id) {
  let item = this._getItemById(id);
  if (item) {
    if (!item.model.get('isReady')) {
      this._left -= 1;
    }

    item
      .off('todoChange', this._onItemChange, this)
      .off('todoRemove', this._onItemRemove, this);

    let itemIndex = this._items.indexOf(item);
    this._items.splice(itemIndex, 1);
    this.trigger('todoRemove', item.model);
  }
  return this;
};

TodosList.prototype.selectAll = function () {
  this._items.forEach(function (item) {
    item.changeReady(true);
  });
  return this;
};

TodosList.prototype.setFilter = function (filterId) {
  if (filterId) {
    this._filter = filterId;
    return this.filterShowedItems(filterId);
  }
  return this.filterShowedItems(this._filter);
};

TodosList.prototype.filterShowedItems = function(filterId) {
  this._items.forEach(function (item) {
    switch (filterId) {
      case 'all':
        item.visible(true);
        break;
      case 'completed':
        item.visible(item.model.get('isReady'));
        break;
      case 'active':
        item.visible(!item.model.get('isReady'));
        break;
    }
  });
  return this;
};

TodosList.prototype.getRoot = function () {
  return this._root;
};

module.exports = TodosList;
