"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _middleware = require("../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Schema = _mongoose.default.Schema;
var userSchema = new Schema({
  _id: {
    type: _mongoose.default.Types.ObjectId,
    auto: true
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  party: [{
    type: Schema.Types.ObjectId,
    ref: 'Party'
  }]
});
userSchema.pre('save', /*#__PURE__*/_asyncToGenerator(function* () {
  this.password = _middleware.Authorize.encryptPassword(this.password);
}));

userSchema.methods.generateToken = function () {
  return _middleware.Authorize.generateToken({
    id: this._id
  });
};

userSchema.methods.comparePassword = function (password) {
  return _middleware.Authorize.comparePassword(password, this.password);
};

var _default = _mongoose.default.model('User', userSchema);

exports.default = _default;