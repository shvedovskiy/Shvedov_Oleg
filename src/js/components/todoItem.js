TODO_APP.components.TodoItem = () => {

};

TODO_APP.components.TodoItem.prototype.init = (root) => {
  root.querySelector('.js-remove').addEventListener('click', this);
  root.querySelector('.js-ready-marker').addEventListener('click', this);
};

TODO_APP.components.TodoItem.prototype.handleEvent = (e) => {
  switch (e.type) {
    case 'click':
      if (e.target.closest('.js-remove')) {
        this.remove();
      } else if (e.target.closest('.js-ready-marker')) {
        this.changeReady();
      }
      break;
    default:
      break;
  }
};

TODO_APP.components.TodoItem.prototype.remove = () => {

};

TODO_APP.components.TodoItem.prototype.changeReady = () => {

};
