let elem = document.createElement('div');

function getTemplateRootNode(scriptId) {
  const script = document.getElementById(scriptId);
  elem.innerHTML = script.innerHTML;

  const result = elem.children[0];
  elem.removeChild(result);

  return result;
}

const templateEngine = {
  todoItem: function (data) {
    const root = getTemplateRootNode('todoItemTemplate');
    const readyMarkWrapper = root.querySelector('.todo-item_ready-mark');
    const readyMark = root.querySelector('.js-todo-item_ready-mark');
    const removeWrapper = root.querySelector('.todo-item_remove');
    const remove = root.querySelector('.js-todo-item_remove');
    const text = root.querySelector('.js-todo-item_text');

    if (data.text) {
      text.innerText = data.text;
    }

    if (data.isReady) {
      readyMark.checked = true;
    }

    return {
      root,
      text,
      readyMarkWrapper,
      readyMark,
      removeWrapper,
      remove
    };
  }
};

export default templateEngine;