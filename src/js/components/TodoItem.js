let extendConstructor = require('../util/extendConstructor');
let Eventable         = require('../util/Eventable');
let templateEngine    = require('../util/templateEngine');

function TodoItem(data) {
  this._initEventable();

  let elem = templateEngine.todoItem({text: data.text});

  this._root      = elem.root;
  this._readyMark = elem.readyMark;
  this._remove    = elem.remove;
  this._text      = elem.text;

  this.model = {
    id:      data.id,
    isReady: data.isReady || false,
    text:    data.text
  };

  if (data.isReady) {
    this._manageReadyModificator(true);
    this.trigger('todoChange', this.model);
  }

  this._readyMark.addEventListener('change', this);
  this._remove.addEventListener('click', this);
  this._text.addEventListener('blur', this);
}

extendConstructor(TodoItem, Eventable);

TodoItem.prototype.render = function (parent) {
  parent.appendChild(this._root);
  return this;
};

TodoItem.prototype._onSetText = function (newText) {
  if (this.model.text !== newText) {
    this._text.innerText = newText;
    this.model.text = newText;
  }
  return this;
};

TodoItem.prototype._manageReadyModificator = function (isReady) {
  if (isReady) {
    this._root.classList.add('__ready');
  } else {
    this._root.classList.remove('__ready');
  }
  return this;
};

TodoItem.prototype.changeReady = function (isReady) {
  if (isReady !== this.model.isReady) {
    this._readyMark.checked = isReady;
    this.model.isReady = isReady;
    this._manageReadyModificator(isReady);
    this.trigger('todoChange', this.model);
  }
  return this;
};

TodoItem.prototype.remove = function () {
  this._root.parentNode.removeChild(this._root);
  return this.trigger('todoRemove', this.model.id);
};

TodoItem.prototype.visible = function (isVisible) {
  if (isVisible) {
    this._root.classList.remove('__hide');
  } else {
    this._root.classList.add('__hide');
  }
};

TodoItem.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'change':
      this.changeReady(this._readyMark.checked);
      break;
    case 'click':
      if (e.target === this._remove) {
        this.remove();
      }
      break;
    case 'blur':
      this._onSetText(this._text.innerText);
      break;
  }
};

module.exports = TodoItem;
