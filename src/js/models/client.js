export default client = (function () {
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
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
      .then(success)
      .catch(fail);
  }

  function updateList(data, success, fail) {
    return fetch('api/todos/update', {
      method: 'put',
      body: JSON.stringify(data),
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
    updateItem,
    updateList
  };
}());
