
/**
 * isObject
 *
 * @param  {Mixed}  arg
 * @return {Boolean}     If arg is an object
 */
exports.isObject = function (arg) {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
};
