/**
 * Safely pull a property of an object without throwing
 *
 * @return {any}
 *  Usage: `getSafe(obj.with.a.lot.of.nested.properties)`
 *  See this website for more info: https://silvantroxler.ch/2017/avoid-cannot-read-property-of-undefined/
 */
const getSafe = (fn = () => ({}), fallback = undefined) => {
  try {
    return fn();
  } catch (e) {
    return fallback;
  }
};

module.exports = { getSafe };
