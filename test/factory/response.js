/**
 *  Response factory class
 */
class Response {
    /**
   * constructor function
   */
    constructor(){
        this.statusCode = 403;
    }
    /**
   * Status generator
   * @param {number} status
   * @returns {object} status
   */
    status(status){
        this.number = status;
        return this;
    }
    /**
   * Status generator
   * @param {object} data
   * @returns {object} data
   */
    json(data){
        return data;
    }
    
}

export default Response;
