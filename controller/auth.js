import {User} from '../models';
import {Authorize} from '../middleware';

/**
 *  user Authentication controller
 */
class UserAuth {

    /**
   * registers a user
   * @param {object} req
   *  @param {object} res
   * @returns {object} registered User
   */
    static async register(req, res) {
        const {firstName, lastName, email, password} = req.body;
        const user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                status: 400,
                error: 'This user already exists',
              });
        }
        const encrypt = Authorize.encryptPassword(password);
        let result =  new User({firstName, lastName, email, password: encrypt });
        await result.save();
        const {id} = result
        const token = Authorize.generateToken({id})
        return res.status(201).json({
            status: res.statusCode,
            id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            token,
            message: 'signup was successful'
        });
    }

     /**
   * login a user
   * @param {object} req
   *  @param {object} res
   * @returns {object} registered User
   */
    static async login(req, res) {
        const {email, password} = req.body

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'invalid email/password'
            })
        }
        const {id} = user;
        const result = Authorize.comparePassword(password, user.password);
        const token = Authorize.generateToken({id})
        if(result) {
            return res.status(201).json({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
                message: 'login was sucessful'
            })
        }
        return res.status(401).json({
            status: res.statusCode,
            message: 'invalid email/password'
        })
    }
}

export default UserAuth;