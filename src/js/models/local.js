const local = (function () {
  function read(key) {
    if (typeof Storage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  function write(key, data) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(key, data);
      return true;
    }
    return false;
  }

  return {
    read,
    write
  };
}());

module.exports = local;
