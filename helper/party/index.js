import {Party, User} from '../../models';

/**
 *  user Authentication controller
 */
class Resource {
    /**
   * create a party
   * @param {object} inputs
   *  @param {object} model
   * @returns {object} created party
   */
    static async create(inputs, model){
        const partyEvent = await new model(inputs);
        return partyEvent.save()
    }
}

export default Resource;