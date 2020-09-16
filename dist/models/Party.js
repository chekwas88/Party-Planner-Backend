"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0.0
  },
  done: {
    type: Boolean,
    default: false
  }
});
var partySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  time: {
    type: String,
    required: true
  },
  theme: {
    type: String
  },
  budget: {
    type: Number,
    default: 0.0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  expense: {
    type: [expenseSchema],
    default: undefined
  },
  total_expense: {
    type: Number
  },
  private: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});

var _default = _mongoose.default.model('Party', partySchema);

exports.default = _default;