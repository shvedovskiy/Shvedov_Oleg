export default local = (function () {
  function create(key) {
    if (typeof Storage !== 'undefined') {
      const entry = {
        time: null,
        data: []
      };
      localStorage.setItem(key, JSON.stringify(entry));
      return true;
    }
    return false;
  }

  function read(key) {
    if (typeof Storage !== 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  }

  function write(key, data) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    }
    return false;
  }

  function clear(key) {
    if (typeof Storage !== 'undefined') {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  return {
    read,
    write,
    create,
    clear
  };
}());
