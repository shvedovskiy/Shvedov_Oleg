function Storage() {

}

Storage.prototype.getEntriesList = function () {
  if (typeof Storage !== 'undefined') {
    const entry = localStorage.getItem('key');
    if (entry) {
      return entry.data;
    }
  }
  return null;
};

Storage.prototype.putEntriesList = function(data) {
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

Storage.prototype.addListEntry = function(entry) {
  if (typeof Storage !== 'undefined') {
    let data = localStorage.getItem('key').data;
    const newData = data.slice().concat(entry);
    const entry = {
      time: new Date().getTime(),
      data: data
    };
    localStorage.setItem('key', JSON.stringify(entry));
    return true;
  }
  return false;
};


Storage.prototype.removeListEntry = function (entry) {

};

Storage.prototype.changeEntry = function (entry) {

};

module.exports = Storage;