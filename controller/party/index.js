import {Party, User} from '../../models';
import {Authorize} from '../../middleware';

/**
 *  user Authentication controller
 */
class MyEvent {

    /**
   * create a party
   * @param {object} req
   *  @param {object} res
   * @returns {object} created party
   */
   static async createParty(req, res){
     const {id} = req.user;
    const user = await User.findById(id);
    if(user) {
        const {body} = req;
        const expenditure = body.expense.reduce((cum, exp) => cum + exp.amount, 0)
        console.log("exp", expenditure)
        const partyEvent = new Party({...body, total_expense:expenditure, owner: id});
        const {
            id,
            name,
            venue,
            description,
            date,
            time,
            theme,
            budget,
            owner,
            expense,
            total_expense,
            
        } = partyEvent;
        return res.status(200).json({
            status: res.statusCode,
            message: 'Party created successfully',
            id,
            name,
            venue,
            description,
            date: new Date(date).toDateString(),
            time,
            theme,
            budget,
            owner,
            expense,
            total_expense,
            private: partyEvent.private
            
        });
    }
    return res.status(401).json({
        status: res.statusCode,
        message: 'You are not authorize to create this resource'
    });
    
   }

}

export default MyEvent;