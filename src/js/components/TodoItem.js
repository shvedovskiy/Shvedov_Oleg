let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');
let templateEngine    = require('../util/templateEngine');

/**
 * @extends {EventListener}
 * @param {TodoModel} model
 * @constructor
 */
function TodoItem(model) {
  this._initEventable();

  let elem = templateEngine.todoItem({text: model.get('text')});

  this._root = elem.root;
  /**
   * @type {HTMLElement}
   * @private
   */
  this._readyMark = elem.readyMark;
  /**
   * @type {HTMLElement}
   * @private
   */
  this._remove = elem.remove;
  this._text = elem.text;
  /**
   * @type {TodoModel}
   * @public
   */
  this._model = model;

  this._model.onChange('isReady', function (data) {
    this._manageReadyModificator(data['value']);
  }, this);

  this._readyMark.addEventListener('change', this);
  this._remove.addEventListener('click', this);
  this._text.addEventListener('blur', this);
}

extendConstructor(TodoItem, Eventable);

/**
 * @param {HTMLElement} parent
 * @returns {TodoItem}
 */
TodoItem.prototype.render = function (parent) {
  parent.appendChild(this._root);
  return this;
};

/**
 * @callback handleEvent
 * @param {String} newText
 * @returns {TodoItem}
 * @private
 */
TodoItem.prototype._onSetText = function (newText) {
  if (this._model.get('text') !== newText) {
    this._text.innerText = newText;
    this._model.set('text', newText);
  }
  return this;
};

/**
 * @param {Boolean} isReady
 * @returns {TodoItem}
 * @private
 */
TodoItem.prototype._manageReadyModificator = function (isReady) {
  if (isReady) {
    this._root.classList.add('__ready');
  } else {
    this._root.classList.remove('__ready');
  }
  this._readyMark.checked = isReady;
  return this;
};

/**
 * @param {Boolean} isReady
 * @returns {TodoItem}
 */
TodoItem.prototype.changeReady = function (isReady) {
  if (isReady !== this._model.get(isReady)) {
    this._model.set('isReady', isReady);
    this._manageReadyModificator(isReady);
    this.trigger('todoChange', this._model);
  }
  return this;
};

/**
 * @callback handleEvent
 * @private
 */
TodoItem.prototype._onRemove = function () {
  this._model.set('deleted', true);
};

/**
 * @returns {TodoItem}
 */
TodoItem.prototype.remove = function () {
  this._root.parentNode.removeChild(this._root);
  return this;
};

/**
 * @param {Boolean} isVisible
 * @returns {TodoItem}
 */
TodoItem.prototype.visible = function (isVisible) {
  if (isVisible) {
    this._root.classList.remove('__hide');
  } else {
    this._root.classList.add('__hide');
  }
  return this;
};

TodoItem.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'change':
      this.changeReady(this._readyMark.checked);
      break;
    case 'click':
      if (e.target === this._remove) {
        this._onRemove();
      }
      break;
    case 'blur':
      this._onSetText(this._text.innerText);
      break;
  }
};

module.exports = TodoItem;
