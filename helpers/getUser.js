import {User} from '@/models';

const getUser = async (id) => {
    try{
        return await User.findById(id);
    }catch(e){
        throw new Error("Error getting User from database")
    }
}

export default getUser;