const client = require('./client');
const local = require('./local');


function Storage() { }

Storage.prototype.getEntriesList = function () {
  let list;

  return new Promise((resolve, reject) => {
    client.getList(
      response => {
        list = response.data;
        if (list.length) {
          resolve(list);
        }
        reject();
      },
      err => {
        list = local.read('key');
        if (list) {
          resolve(JSON.parse(list).data);
        }
        reject();
      }
    );
  });
};

Storage.prototype.putEntriesList = function (data) {
  const now = new Date().getTime();

  client.putList(
    JSON.stringify({
      time: now
    }),
    response => true,
    err => {
      const entry = JSON.stringify({
        time: now,
        data
      });
      return !!local.write('key', entry);
    }
  );
};

Storage.prototype.addListItem = function (item) {
  let now = new Date().getTime();

  client.addItem(
    JSON.stringify({
      time: now,
      item
    }),
    response => true,
    err => {
      now = new Date().getTime();
      let entry = JSON.parse(local.read('key'));

      if (!entry) {
        local.write('key', JSON.stringify({
          time: now,
          data: []
        }));
      }

      entry.time = now;
      entry.data.push(item);

      return !!local.write('key', JSON.stringify(entry));
    }
  );
};

Storage.prototype.removeListItem = function (itemId) {
  client.deleteItem(
    JSON.stringify({
      id: itemId
    }),
    response => true,
    err => {
      const entry = JSON.parse(local.read('key'));

      if (entry) {
        for (let i = 0, l = entry.data.length; i < l; i++) {
          if (entry.data[i].id === itemId) {
            entry.data.splice(i, 1);
            break;
          }
        }

        if (local.write('key', JSON.stringify(entry))) {
          return true;
        }
      }
      return false;
    }
  );
};

Storage.prototype.changeListItem = function (item) {
  client.updateItem(
    JSON.stringify({
      id: item.id,
      isReady: item.isReady,
      text: item.text
    }),
    response => true,
    err => {
      const entry = JSON.parse(local.read('key'));

      if (entry) {
        for (let i = 0, l = entry.data.length; i < l; i++) {
          if (entry.data[i].id === item.id) {
            entry.data[i] = item;
            break;
          }
        }

        if (local.write('key', JSON.stringify(entry))) {
          return true;
        }
      }
      return false;
    }
  );
};

module.exports = Storage;
