const local = require('./local');

function Storage() {
  this.KEY = 'TODOS';
}

Storage.prototype.getEntriesList = function () {
  let list;

  return new Promise((resolve, reject) => {
    list = local.read(this.KEY);
    if (list) {
      resolve(list.data);
    }
    reject();
  });
};

Storage.prototype.putEntriesList = function (data) {
  const entry = {
    time: new Date().getTime(),
    data
  };

  return !!local.write(this.KEY, entry);
};

Storage.prototype.addListItem = function (item) {
  const now = new Date().getTime();
  let entry = local.read(this.KEY);

  if (!entry) {
    local.write(this.KEY, {
      time: now,
      data: []
    });
    entry = local.read(this.KEY);
  }

  entry.time = now;
  entry.data.push(item);

  return !!local.write(this.KEY, entry);
};

Storage.prototype.removeListItem = function (itemId) {
  const entry = local.read(this.KEY);

  if (entry) {
    for (let i = 0, l = entry.data.length; i < l; i++) {
      if (entry.data[i].id === itemId) {
        entry.data.splice(i, 1);
        break;
      }
    }

    if (local.write(this.KEY, entry)) {
      return true;
    }
  }
  return false;
};

Storage.prototype.changeListItem = function (item) {
    const entry = local.read(this.KEY);

    if (entry) {
      for (let i = 0, l = entry.data.length; i < l; i++) {
        if (entry.data[i].id === item.id) {
          entry.data[i] = item;
          break;
        }
      }

      if (local.write(this.KEY, entry)) {
        return true;
      }
    }
    return false;
};

module.exports = Storage;
