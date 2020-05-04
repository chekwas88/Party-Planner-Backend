import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    name: { type : String , required: true },
    description: { type : String , required: true },
    amount: { type : Number , required: true, default: 0.0 },
    done: {type: Boolean, default: false},
});

const partySchema = new Schema({
    name: { type : String , required: true },
    venue: { type : String , required: true },
    description:{ type : String , required: true },
    date: { type : Date , default: Date.now() },
    time: { type : String , required: true },
    theme: { type : String },
    budget: {type: Number, default: 0.0},
    owner:{ type: Schema.Types.ObjectId, ref: 'User' },
    expense:{type: [expenseSchema], default:undefined},
    total_expense: {type: Number},
    private:{type: Boolean, default: false},
    created_at: { type : Date , default: Date.now() },
    updated_at: { type : Date , default: Date.now() }

});


export default mongoose.model('Party', partySchema);
