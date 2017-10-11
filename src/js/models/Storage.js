import client from './client';
import local from './local';

export default class Storage {
  constructor() {
    window.addEventListener('online', () => this.checkStorage());
    window.addEventListener('load', () => this.checkStorage());
  }

  checkStorage() {
    const offlineStorage = local.read('key');
    if (offlineStorage) {
      client.updateList(
        {
          time: offlineStorage.time,
          data: offlineStorage.data
        },
        response => {
          local.clear('key');
          return true;
        },
        err => false
      );
    }
  }

  getEntriesList() {
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
            resolve(list.data);
          }
          reject();
        }
      );
    });
  }

  putEntriesList(data) {
    const now = new Date().getTime();

    client.putList(
      { time: now },
      response => true,
      err => {
        const entry = {
          time: now,
          data
        };
        return !!local.write('key', entry);
      }
    );
  }

  addListItem(item) {
    let now = new Date().getTime();

    client.addItem(
      {
        time: now,
        item
      },
      response => true,
      err => {
        now = new Date().getTime();
        let entry = local.read('key');

        if (!entry) {
          local.write('key', {
            time: now,
            data: []
          });
        }

        entry.time = now;
        entry.data.push(item);

        return !!local.write('key', entry);
      }
    );
  }

  removeListItem(itemId) {
    client.deleteItem(
      {
        id: itemId
      },
      response => true,
      err => {
        const entry = local.read('key');

        if (entry) {
          for (let i = 0, l = entry.data.length; i < l; i++) {
            if (entry.data[i].id === itemId) {
              entry.data.splice(i, 1);
              break;
            }
          }

          if (local.write('key', entry)) {
            return true;
          }
        }
        return false;
      }
    );
  }

  changeListItem(item) {
    client.updateItem(
      {
        id: item.id,
        isReady: item.isReady,
        text: item.text
      },
      response => true,
      err => {
        const entry = local.read('key');

        if (entry) {
          for (let i = 0, l = entry.data.length; i < l; i++) {
            if (entry.data[i].id === item.id) {
              entry.data[i] = item;
              break;
            }
          }

          if (local.write('key', entry)) {
            return true;
          }
        }
        return false;
      }
    );
  }
}
