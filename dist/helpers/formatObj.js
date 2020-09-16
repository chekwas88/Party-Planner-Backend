"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
  * remove duplicate from an object
  * @param {Array} myArr
  *  @param {any}  prop
  * @returns {Array} unique objects array
  */
var removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

var _default = removeDuplicates;
exports.default = _default;