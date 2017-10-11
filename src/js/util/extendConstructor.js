/**
 * @param {Function} Extendable
 * @param {Function} Extension
 * @return {Function} Extendable
 */
export default function extendConstructor(Extendable, Extension) {
  for (let p in Extension.prototype) {
    Extendable.prototype[p] = Extension.prototype[p];
  }
  return Extendable;
}
