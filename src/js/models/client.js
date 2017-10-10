const client = (function () {
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  function getList(success, fail) {
    return fetch('/api/todos', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(checkStatus)
      .then(parseJSON)
      .then(success)
      .catch(fail);
  }

  function putList(data, success, fail) {
    return fetch('api/todos/new', {
      method: 'post',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
      .then(success)
      .catch(fail);
  }

  function addItem(data, success, fail) {
    return fetch('api/todos', {
      method: 'post',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
      .then(success)
      .catch(fail);
  }

  function deleteItem(data, success, fail) {
    return fetch('api/todos', {
      method: 'delete',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
      .then(success)
      .catch(fail);
  }

  function updateItem(data, success, fail) {
    return fetch('api/todos', {
      method: 'put',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
      .then(success)
      .catch(fail);
  }

  return {
    getList,
    putList,
    addItem,
    deleteItem,
    updateItem
  };
}());

module.exports = client;
