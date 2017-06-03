function TodosMainConstructor() {
  this._todosMain = document.querySelector('.js-todos-main');
}

TodosMainConstructor.prototype.updateMarkers = function (isVisible) {
  if (isVisible) {
    this._todosMain.classList.remove('__empty');
  } else {
    this._todosMain.classList.add('__empty');
  }
  return this;
};

module.exports = TodosMainConstructor;
