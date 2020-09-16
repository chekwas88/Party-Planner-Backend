"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PORT = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
_dotenv.default.config();

var databaseURI;

if (process.env.NODE_ENV === 'production') {
  databaseURI = process.env.PRODB;
} else if (process.env.NODE_ENV === 'test') {
  databaseURI = process.env.TESTDB;
} else {
  databaseURI = process.env.DEVDB;
}

_mongoose.default.Promise = global.Promise;

_mongoose.default.connect(databaseURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json()); // catch 404 and forward to error handler

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(_routes.default);
var PORT = process.env.PORT;
exports.PORT = PORT;
var _default = app;
exports.default = _default;