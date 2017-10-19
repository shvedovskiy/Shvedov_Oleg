/**
 * @param {HTMLElement} root
 * @constructor
 */
export default class TodosMain {
  constructor(root) {
    this._root = root;
    this._todosMain = root.querySelector('.js-todos-main');
  }

  /**
   * @param {Boolean} isVisible
   * @returns {TodosMain}
   */
  updateInterfaceVisibility(isVisible) {
    if (isVisible) {
      this._todosMain.classList.remove('__empty');
    } else {
      this._todosMain.classList.add('__empty');
    }
    return this;
  }

  /**
   * @returns {HTMLElement}
   */
  getRoot() {
    return this._root;
  }
}
