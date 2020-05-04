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
        try{
            const user = await User.findById(id);
            if(user) {
                const {body} = req;
                const expenditure = body.expense.reduce((cum, exp) => cum + exp.amount, 0)
                console.log("exp", expenditure)
                const partyEvent = new Party({...body, total_expense:expenditure, owner: user._id});
                partyEvent.save();
                const {
                    id,
                    name,
                    venue,
                    description,
                    date,
                    time,
                    theme,
                    owner,
                    budget,
                    expense,
                    total_expense,
                    
                } = partyEvent;
                return res.status(200).json({
                    status: res.statusCode,
                    message: 'Party created successfully',
                    id,
                    name,
                    venue,
                    owner,
                    description,
                    date: new Date(date).toDateString(),
                    time,
                    theme,
                    budget,
                    expense,
                    total_expense,
                    private: partyEvent.private
                    
                });
            }
            return res.status(401).json({
                status: res.statusCode,
                message: 'You are not authorize to create this resource'
            });
        }catch(e){
            throw new Error('Problem creating a party')
        }
        
    
   }

   /**
   * get a party
   * @param {object} req
   *  @param {object} res
   * @returns {object} created party
   */
    static async getParty(req, res){
        const {id} = req.params;
        
        const userId = req.user ? req.user.id : null;
        try {
            const user = await User.findById(userId);
            const party = await Party.findById(id).populate({
                path: 'owner',
                select: 'firstName email lastName'
            });
            if(party){
                if(!party.private){
                    return res.status(200).json({
                        status: res.statusCode,
                        message: 'success',
                        party,
                    })
                }
                if(party.private && user){
                    if(user.id === party.owner.id){
                        return res.status(200).json({
                            status: res.statusCode,
                            message: 'success',
                            party,
                        })
                    }
                   
                }
                return res.status(401).json({
                    status: res.statusCode,
                    message: 'Unauthorized',
                })
            }
            return res.status(404).json({
                status: res.statusCode,
                message: 'not found',
            })
            
        }catch(e){
            console.log(e);
            throw new Error('Problem getting this resource')
        }
   
   } 

}

export default MyEvent;