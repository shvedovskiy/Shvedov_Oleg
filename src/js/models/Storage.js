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

// Storage.prototype.addListItem = function(item) {
//   if (typeof Storage !== 'undefined') {
//     let entry = JSON.parse(localStorage.getItem('key'));
//     //const newData = data.list.push(item);
//     // entry.time = new Date().getTime();
//     entry.data.list.push(item);
//
//     //const entry = {
//     //  time: new Date().getTime(),
//     //  data: data.list.push(item)
//     //};
//     localStorage.setItem('key', JSON.stringify(entry));
//     return true;
//   }
//   return false;
// };


// Storage.prototype.removeListEntry = function (entry) {
//
// };
//
// Storage.prototype.changeEntry = function (entry) {
//
// };

module.exports = Storage;