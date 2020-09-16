 /**
   * remove duplicate from an object
   * @param {Array} myArr
   *  @param {any}  prop
   * @returns {Array} unique objects array
   */
 const removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}
export default removeDuplicates;