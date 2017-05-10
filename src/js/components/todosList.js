TODO_APP.components.TodosList = function(root) {
  this.allCnt = 0;
  this.leftCnt = 0;
  this.init.apply(this, root);
};

var TodosList = TODO_APP.components.TodosList;

TodosList.prototype.init = function(root) {
  TodosList.DOM = {
    $actionsBar: root.querySelector('.js-actions-bar'),
    $counter: root.querySelector('.js-left-counter'),
    $clearCompleted: root.querySelector('.js-clear-completed'),
    $filters: root.querySelector('.js-filters'),
  };

  if (this.leftCnt > 0) {
    this.DOM.$clearCompleted.style.display = 'inline-block';
    this.DOM.$actionsBar.style.display = 'block';
  } else {
    root.classList.add('__empty');
    this.DOM.$clearCompleted.style.display = 'none';
    this.DOM.$actionsBar.style.display = 'none';
  }

  this.DOM.$counter.innerText = this.leftCnt.toString();
};

var list = new TodosList(document.querySelector('.js-main'));
