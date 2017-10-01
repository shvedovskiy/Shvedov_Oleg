const client = require('./client');

function Storage() { }

Storage.prototype.getEntriesList = function () {
  if (typeof Storage !== 'undefined') {
    const entry = localStorage.getItem('key');
    if (entry) {
      return JSON.parse(entry).data;
    }
  }
  return null;
};

Storage.prototype.putEntriesList = function (data) {
  if (typeof Storage !== 'undefined') {
    const entry = {
      time: new Date().getTime(),
      data: data
    };
    localStorage.setItem('key', JSON.stringify(entry));
    return true;
  }
  return false;
};

Storage.prototype.addListItem = function (item) {
  if (typeof Storage !== 'undefined') {
    let entry = JSON.parse(localStorage.getItem('key'));

    entry.time = new Date().getTime();
    entry.data.push(item);

    localStorage.setItem('key', JSON.stringify(entry));
    return true;
  }
  return false;
};

Storage.prototype.removeListItem = function (itemId) {
  if (typeof Storage !== 'undefined') {
    let entry = JSON.parse(localStorage.getItem('key'));

    for (let i = 0, l = entry.data.length; i < l; i++) {
      if (entry.data[i].id === itemId) {
        entry.data.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('key', JSON.stringify(entry));
    return true;
  }
  return false;
};

Storage.prototype.changeListItem = function (item) {
  if (typeof Storage !== 'undefined') {
    let entry = JSON.parse(localStorage.getItem('key'));

    for (let i = 0, l = entry.data.length; i < l; i++) {
      if (entry.data[i].id === item.id) {
        entry.data[i] = item;
        break;
      }
    }
    localStorage.setItem('key', JSON.stringify(entry));
    return true;
  }
  return false;
};

module.exports = Storage;
