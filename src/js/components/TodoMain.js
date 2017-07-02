/**
 * @param {HTMLElement} root
 * @constructor
 */
function TodosMain(root) {
  this._root = root;
  this._todosMain = root.querySelector('.js-todos-main');
}

/**
 * @param {Boolean} isVisible
 * @returns {TodosMain}
 */
TodosMain.prototype.updateInterfaceVisibility = function (isVisible) {
  if (isVisible) {
    this._todosMain.classList.remove('__empty');
  } else {
    this._todosMain.classList.add('__empty');
  }
  return this;
};

/**
 * @returns {HTMLElement}
 */
TodosMain.prototype.getRoot = function () {
  return this._root;
};

module.exports = TodosMain;
