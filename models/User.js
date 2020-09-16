import mongoose from 'mongoose';
import {Authorize} from '../middleware';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {type: mongoose.Types.ObjectId, auto: true},
    firstName: String,
    lastName: String,
    email: { type : String , unique : true, required: true },
    password: { type : String , required: true },
    party:[{ type: Schema.Types.ObjectId, ref: 'Party' }]

});
userSchema.pre('save', async function(){
    this.password = Authorize.encryptPassword(this.password)
});

userSchema.methods.generateToken = function(){
    return Authorize.generateToken({id: this._id});
}

userSchema.methods.comparePassword = function(password){
    return Authorize.comparePassword(password, this.password)
}


export default mongoose.model('User', userSchema);
