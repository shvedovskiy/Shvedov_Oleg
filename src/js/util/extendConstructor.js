function extendConstructor(Extendable, Extension) {
  for (let p in Extension.prototype) {
    Extendable.prototype[p] = Extension.prototype[p];
  }
  return Extendable;
}

module.exports = extendConstructor;