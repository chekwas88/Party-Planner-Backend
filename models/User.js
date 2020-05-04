import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {type: mongoose.Types.ObjectId, auto: true},
    firstName: String,
    lastName: String,
    email: { type : String , unique : true, required: true },
    password: { type : String , required: true },
    party:[{ type: Schema.Types.ObjectId, ref: 'Party' }]

});


export default mongoose.model('User', userSchema);
