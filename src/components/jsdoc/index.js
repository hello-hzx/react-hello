/* eslint-disable @typescript-eslint/no-unused-vars */
/** jsDoc简单使用 */

console.log("============jsDoc");
/**
 * @constant 常量
 * @type {string} 类型
 */
const RED = "FF0000";

/**
 * 枚举
 * @readonly
 * @enum {number}
 */
const triState = {
  /** The true value */
  TRUE: 1,
  FALSE: -1,
  /** @type {boolean} */
  MAYBE: true,
};

/**
 * 返回 Premise类型
 * @param {{name: string, age: number}} a 对象类型
 * @param {Object.<string, number>} b 键值对类型
 * @returns {Promise} Promise object represents the sum of a and b
 */
function sumAsync(a, b) {
  return new Promise((resolve, reject) => {
    resolve(a.age + b.a);
  });
}

/**
 * 返回组合类型
 * @param {!number} a 只能为数字
 * @param {number} b
 * @param {number} [c=1] 可选参数，默认为1
 * @param {?boolean} retArr boolean或null
 * @returns {(number|Array)}
 */
function sum(a, b, c, retArr) {
  if (retArr) {
    return [a, b, a + b];
  }
  return a + b;
}

/**
 * 定义复杂类型
 * @typedef PropertiesHash
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} name - your name.
 * @property {number} age - your age.
 */

/** @type {PropertiesHash|null} */
const props = null;

console.log("============jsDoc");
export default {};
