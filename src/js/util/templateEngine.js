let elem = document.createElement('div');

function getTemplateRootNode(scriptId) {
  let script = document.getElementById(scriptId);
  elem.innerHTML = script.innerHTML;

  let result = elem.children[0];
  elem.removeChild(result);

  return result;
}

let templateEngine = {
  todoItem: function (data) {
    let root = getTemplateRootNode('todoItemTemplate');
    let readyMark = root.querySelector('.js-todo-item_ready-mark');
    let remove = root.querySelector('.js-todo-item_remove');
    let text = root.querySelector('.js-todo-item_text');

    if (data.text) {
      text.innerText = data.text;
    }

    if (data.isReady) {
      readyMark.checked = true;
    }

    return {
      root: root,
      text: text,
      readyMark: readyMark,
      remove: remove
    };
  }
};

module.exports = templateEngine;