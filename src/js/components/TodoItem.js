import extendConstructor from '../util/extendConstructor';
import Eventable from '../util/Eventable';
import templateEngine from '../util/templateEngine';

/**
 * @extends {EventListener}
 * @param {TodoModel} model
 * @constructor
 */
export default class TodoItem {
  constructor(model) {
    this._initEventable();

    let elem = templateEngine.todoItem({ text: model.get('text') });

    this._root = elem.root;
    this._readyMarkWrapper = elem.readyMarkWrapper;
    /**
     * @type {HTMLElement}
     * @private
     */
    this._readyMark = elem.readyMark;
    this._removeWrapper = elem.removeWrapper;
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

    this._model.onChange('isReady', data => {
      this._manageReadyModificator(data['value']);
    }, this);

    this._readyMarkWrapper.addEventListener('keypress', this);
    this._readyMark.addEventListener('change', this);
    this._removeWrapper.addEventListener('keypress', this);
    this._remove.addEventListener('click', this);
    this._text.addEventListener('blur', this);
  }

  /**
   * @param {HTMLElement} parent
   * @returns {TodoItem}
   */
  render(parent) {
    parent.appendChild(this._root);
    return this;
  }

  /**
   * @callback handleEvent
   * @param {String} newText
   * @returns {TodoItem}
   * @private
   */
  _onSetText(newText) {
    if (this._model.get('text') !== newText) {
      this._text.innerText = newText;
      this._model.set('text', newText);
    }
    return this;
  }

  /**
   * @param {Boolean} isReady
   * @returns {TodoItem}
   * @private
   */
  _manageReadyModificator(isReady) {
    if (isReady) {
      this._root.classList.add('__ready');
    } else {
      this._root.classList.remove('__ready');
    }
    this._readyMark.checked = isReady;
    return this;
  }

  /**
   * @param {Boolean} isReady
   * @returns {TodoItem}
   */
  changeReady(isReady) {
    if (isReady !== this._model.get('isReady')) {
      this._model.set('isReady', isReady);
      this._manageReadyModificator(isReady);
      this.trigger('todoChange', this._model);
    }
    return this;
  }

  /**
   * @callback handleEvent
   * @private
   */
  _onRemove() {
    this._model.set('deleted', true);
  }

  /**
   * @returns {TodoItem}
   */
  remove() {
    this._root.parentNode.removeChild(this._root);
    return this;
  }

  /**
   * @param {Boolean} isVisible
   * @returns {TodoItem}
   */
  visible(isVisible) {
    if (isVisible) {
      this._root.classList.remove('__hide');
    } else {
      this._root.classList.add('__hide');
    }
    return this;
  }

  handleEvent(e) {
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
      case 'keypress':
        if (e.keyCode === 13) {
          if (e.target.closest('.todo-item_ready-mark')) {
            this._readyMark.checked = !this._readyMark.checked;
            this.changeReady(this._readyMark.checked);
          } else if (e.target.closest('.todo-item_remove') && e.target === this._removeWrapper) {
            this._onRemove();
          }
        }
        break;
    }
  }
}

extendConstructor(TodoItem, Eventable);
