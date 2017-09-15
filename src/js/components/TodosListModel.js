const extendConstructor = require('../util/extendConstructor');
const Eventable = require('../util/Eventable');
const Storage = require('../models/Storage');
const StorageInstance = new Storage();
const TodoModel = require('./TodoModel');

/**
 * @param {Array.<TodoModel>} itemsData
 * @constructor
 */
function TodosListModel() {
  this._initEventable();

  /**
   * @type {Array.<TodoModel>}
   * @private
   */
  const entries = StorageInstance.getEntriesList();

  if (entries) {
    this._items_models = entries['list'];
    this._left = entries['left'];
    this._itemIds = entries['itemIds'];
  } else {
    this._items_models = [];
    this._left = 0;
    this._itemIds = 0;

    StorageInstance.putEntriesList({
      list: [],
      left: 0,
      itemIds: 0
    });
  }
}

extendConstructor(TodosListModel, Eventable);

/**
 * Returns list models.
 * @returns {Array.<TodoModel>}
 */
TodosListModel.prototype.getList = function () {
  return this._items_models;
};

/**
 * @returns {Number}
 */
TodosListModel.prototype.getLeftTodosCount = function () {
  return this._left;
};

/**
 *
 * @param {Function} handler
 * @param {Object} [ctx]
 * @returns {TodosListModel}
 */
TodosListModel.prototype.onChange = function (handler, ctx) {
  this
    .on('todoAdd', handler)
    .on('todoRemoved', handler)
    .on('todoChange', handler)
    .on('modelReadyChange', function (model) {
      switch (model.get('isReady')) {
        case true:
          if (this._left !== 0) {
            this._left -= 1;
          }
          break;
        case false:
          this._left += 1;
      }
      this.trigger('todoChange');
      handler.call(ctx);
    }, this)
    .on('modelRemove', function (model) {
      this.remove(model.get('id'));
      this.trigger('todoChange');
      handler.call(ctx);
    }, this)
    .on('modelChange', function () {
      this.trigger('todoChange');
      handler.call(ctx)
    }, this);

  return this;
};

/**
 *
 * @param {Object} inputData
 * @fires TodosListModel~todoAdd
 * @returns {TodosListModel}
 */
TodosListModel.prototype.add = function (inputData) {
  let model = new TodoModel(
      Object.assign({id: this._itemIds++}, inputData)
  );

  model
    .onAnyChange(function (data) {
      switch(data['field']) {
        case 'text':
          this.trigger('modelTextChange', model);
          break;
        case 'isReady':
          this.trigger('modelReadyChange', model);
          break;
        case 'deleted':
          this.trigger('modelRemove', model);
          break;
        default:
          this.trigger('modelChange', model);
          break;
      }
    }, this);

  if (!model.get('isReady')) {
    this._left += 1;
  }

  this._items_models.push(model);

  /** @event TodosListModel#todoAdd */
  this.trigger('todoAdd', model);
  return this;
};

/**
 * @param {Number} id
 * @returns {TodoModel|null}
 * @private
 */
TodosListModel.prototype._getModelById = function(id) {
  for (let i = 0, l = this._items_models.length; i !== l; i++) {
    if (this._items_models[i].get('id') === id) {
      return this._items_models[i];
    }
  }
  return null;
};

/**
 * @fires TodosListModel#todoRemove
 * @fires TodosListModel#todoRemoved
 * @param {Number} id
 * @returns {TodosListModel}
 */
TodosListModel.prototype.remove = function (id) {
  let model = this._getModelById(id);

  if (model) {
    if (!model.get('isReady')) {
      this._left -= 1;
    }

    /** @event TodosListModel~todoRemove */
    this.trigger('todoRemove', model);

    model.off('modelFieldChange', this);

    let modelIndex = this.getList().indexOf(model);
    this.getList().splice(modelIndex, 1);

    /** @event TodosListModel~todoRemoved */
    this.trigger('todoRemoved');
  }

  return this;
};

/**
 * @returns {TodosListModel}
 */
TodosListModel.prototype.clearCompleted = function () {
  let copyModels = this.getList().slice();
  copyModels.forEach(function (model) {
    if (model.get('isReady')) {
      this.remove(model.get('id'));
    }
  }, this);
  return this;
};

module.exports = TodosListModel;
