import {Party, User} from '../../models';
import mongoose from'mongoose';
import {removeDuplicates, getUser} from '../../helper';
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
                const expenditure = body.expense.reduce((cum, exp) => cum + exp.amount, 0);
                const partyEvent = new Party({...body, total_expense:expenditure, owner: user._id, created_at: Date.now(), update_at: Date.now()});
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
                    created_at,
                    total_expense,
                    
                } = partyEvent;
                // console.log(partyEvent)
                return res.status(204).json({
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
                    private: partyEvent.private,
                    created_at: new Date(created_at).toDateString(),
                    
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
   * @returns {object} party
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

    /**
     * get all parties
     * @param {object} req
     *  @param {object} res
     * @returns {Array} all parties
     */
    static async getParties(req, res) {
            
        const userId = req.user ? req.user.id : null;
        try {
            const user = await User.findById(userId);
                        
            if(!user){
                const publicParties = await Party.find({private: {$eq: false}}).populate({
                    path: 'owner',
                    select: 'firstName email lastName'
                });
                return res.status(200).json({
                    status: res.statusCode,
                    count: publicParties.length,
                    message: 'success',
                    parties: publicParties,
                })
            }
            if(user){
                const userId = mongoose.Types.ObjectId(user.id);
                const parties  = await Promise.all([
                    Party.find({private: false}).populate({
                        path: 'owner',
                        select: 'firstName email lastName'
                    }).sort({ created_at: 'desc'}),
                    Party.find({owner:{_id:user.id }}).populate({
                        path: 'owner',
                        select: 'firstName email lastName'
                    }).sort({ created_at: 'desc'})
                  ]).then( ([ all, userParties ]) => {
                        return [...all, ...userParties];
                  });
                  let results = removeDuplicates(parties, 'id')
                  results.sort((a, b) => b.created_at - a.created_at);
                  return res.status(200).json({
                    status: res.statusCode,
                    count: results.length,
                    message: 'success',
                    parties: results,
                })
                
            }
               
            
            return res.status(404).json({
                status: res.statusCode,
                message: 'not found',
                parties: []
            })
            
        }catch(e){
            console.log(e);
            throw new Error('Problem getting this resource')
        }


    }

     /**
     * delete party
     * @param {object} req
     *  @param {object} res
     * @returns {object} deleted
     */
    static async deleteParty(req, res) {
        const userId = req.user ? req.user.id : null;
        const {id} = req.params;
        try{
            const user = await getUser(userId);
            const party = await Party.findById(id).populate({
                path: 'owner',
                select: 'firstName email lastName id'
            });
            
            if(!party){
                return  res.status(404).json({
                    status: res.statusCode,
                    message: 'not found'
                })
            }
            if((user && party) && (user.id === party.owner.id)){
                await Party.deleteOne({_id:id});
                return res.status(200).json({
                    status: res.statusCode,
                    message: 'Party deleted Successfully'
                })
            }
            return  res.status(403).json({
                status: res.statusCode,
                message: 'You are not authorized to perform this action'
            })
        }catch(e){
            console.log(e);
            throw new Error("Error ocuured trying to delete this resource")
        }
        

    }

    /**
   * update a party
   * @param {object} req
   *  @param {object} res
   * @returns {object} created party
   */
  static async updateParty(req, res){
    const userId = req.user ? req.user.id : null;
    const {id} = req.params;
    try{
        const user = await getUser(userId);
        const party = await Party.findById(id).populate({
            path: 'owner',
            select: 'firstName email lastName id'
        });
        if((user && party) && (user.id === party.owner.id)) {
            const {body} = req;
            const updated = {
                name: body.name || party.name ,
                venue: body.venue || party.venue,
                description: body.description || party.description,
                date: body.date || party.date,
                time: body.time || party.time,
                theme: body.theme || party.theme,
                budget: body.budget || party.budget,
                private: body.private || party.private,
                expense: body.expense || party.expense,
            }
            const expenditure = updated.expense.reduce((cum, exp) => cum + exp.amount, 0);
            const result = await Party.updateOne({_id: id}, {...updated, total_expense: expenditure, updated_at: Date.now()})
           
            return res.status(204).json({
                status: res.statusCode,
                message: 'Party updated successfully',
                modified: result.nModified
                
            });
        }
        return res.status(401).json({
            status: res.statusCode,
            message: 'You are not authorize to update this resource'
        });
    }catch(e){
        throw new Error('Problem creating a party')
    }
    

}

}

export default MyEvent;