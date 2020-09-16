import {User} from '@/models';

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
            return res.status(401).json({
                status: res.statusCode,
                error: 'This user already exists',
              });
        }
        let newUser =  await User.create({firstName, lastName, email, password });
        const {id} = newUser
        const token = newUser.generateToken();
        return res.status(201).json({
            status: res.statusCode,
            id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
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
        const failedLogin = () => {
            
            return res.status(401).json({
                status: res.statusCode,
                error: 'invalid email/password'
            })
        }
        if(!user) {
            return failedLogin()
        }
        const isCorrectPaasword = user.comparePassword(password);
        const token = user.generateToken()
        if(isCorrectPaasword) {
            return res.status(200).json({
                status: res.statusCode,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
                message: 'login was successful'
            })
        }
        return failedLogin();
    }
}

export default UserAuth;