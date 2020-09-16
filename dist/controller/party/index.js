"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../models");

var _helpers = require("../../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  static createParty(req, res) {
    return _asyncToGenerator(function* () {
      var {
        id
      } = req.user;

      try {
        var user = yield _models.User.findById(id);

        if (user) {
          var {
            body
          } = req;
          var expenditure = body.expense.reduce((cum, exp) => cum + exp.amount, 0);
          var partyEvent = yield _models.Party.create(_objectSpread(_objectSpread({}, body), {}, {
            total_expense: expenditure,
            owner: user._id,
            created_at: Date.now(),
            update_at: Date.now()
          }));
          var {
            id: _id,
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
            total_expense
          } = partyEvent;
          return res.status(204).json({
            status: res.statusCode,
            message: 'Party created successfully',
            id: _id,
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
            created_at: new Date(created_at).toDateString()
          });
        }

        return res.status(401).json({
          status: res.statusCode,
          message: 'You are not authorize to create this resource'
        });
      } catch (e) {
        throw new Error('Problem creating a party');
      }
    })();
  }
  /**
  * get a party
  * @param {object} req
  *  @param {object} res
  * @returns {object} party
  */


  static getParty(req, res) {
    return _asyncToGenerator(function* () {
      var {
        id
      } = req.params;
      var userId = req.user ? req.user.id : null;

      try {
        var user = yield _models.User.findById(userId);
        var party = yield _models.Party.findById(id).populate({
          path: 'owner',
          select: 'firstName email lastName'
        });

        if (party) {
          if (!party.private) {
            return res.status(200).json({
              status: res.statusCode,
              message: 'success',
              party
            });
          }

          if (party.private && user) {
            if (user.id === party.owner.id) {
              return res.status(200).json({
                status: res.statusCode,
                message: 'success',
                party
              });
            }
          }

          return res.status(401).json({
            status: res.statusCode,
            message: 'Unauthorized'
          });
        }

        return res.status(404).json({
          status: res.statusCode,
          message: 'not found'
        });
      } catch (e) {
        console.log(e);
        throw new Error('Problem getting this resource');
      }
    })();
  }
  /**
   * get all parties
   * @param {object} req
   *  @param {object} res
   * @returns {Array} all parties
   */


  static getParties(req, res) {
    return _asyncToGenerator(function* () {
      var userId = req.user ? req.user.id : null;

      try {
        var user = yield _models.User.findById(userId);

        if (!user) {
          var publicParties = yield _models.Party.find({
            private: {
              $eq: false
            }
          }).populate({
            path: 'owner',
            select: 'firstName email lastName'
          });
          return res.status(200).json({
            status: res.statusCode,
            count: publicParties.length,
            message: 'success',
            parties: publicParties
          });
        }

        if (user) {
          var parties = yield Promise.all([_models.Party.find({
            private: false
          }).populate({
            path: 'owner',
            select: 'firstName email lastName'
          }).sort({
            created_at: 'desc'
          }), _models.Party.find({
            owner: {
              _id: user.id
            }
          }).populate({
            path: 'owner',
            select: 'firstName email lastName'
          }).sort({
            created_at: 'desc'
          })]).then((_ref) => {
            var [all, userParties] = _ref;
            return [...all, ...userParties];
          });
          var results = (0, _helpers.removeDuplicates)(parties, 'id');
          results.sort((a, b) => b.created_at - a.created_at);
          return res.status(200).json({
            status: res.statusCode,
            count: results.length,
            message: 'success',
            parties: results
          });
        }

        return res.status(404).json({
          status: res.statusCode,
          message: 'not found',
          parties: []
        });
      } catch (e) {
        console.log(e);
        throw new Error('Problem getting this resource');
      }
    })();
  }
  /**
  * delete party
  * @param {object} req
  *  @param {object} res
  * @returns {object} deleted
  */


  static deleteParty(req, res) {
    return _asyncToGenerator(function* () {
      var userId = req.user ? req.user.id : null;
      var {
        id
      } = req.params;

      try {
        var user = yield (0, _helpers.getUser)(userId);
        var party = yield _models.Party.findById(id).populate({
          path: 'owner',
          select: 'firstName email lastName id'
        });

        if (!party) {
          return res.status(404).json({
            status: res.statusCode,
            message: 'not found'
          });
        }

        if (user && party && user.id === party.owner.id) {
          yield _models.Party.deleteOne({
            _id: id
          });
          return res.status(200).json({
            status: res.statusCode,
            message: 'Party deleted Successfully'
          });
        }

        return res.status(403).json({
          status: res.statusCode,
          message: 'You are not authorized to perform this action'
        });
      } catch (e) {
        console.log(e);
        throw new Error("Error ocuured trying to delete this resource");
      }
    })();
  }
  /**
  * update a party
  * @param {object} req
  *  @param {object} res
  * @returns {object} created party
  */


  static updateParty(req, res) {
    return _asyncToGenerator(function* () {
      var userId = req.user ? req.user.id : null;
      var {
        id
      } = req.params;

      try {
        var user = yield (0, _helpers.getUser)(userId);
        var party = yield _models.Party.findById(id).populate({
          path: 'owner',
          select: 'firstName email lastName id'
        });

        if (user && party && user.id === party.owner.id) {
          var {
            body
          } = req;
          var updated = {
            name: body.name || party.name,
            venue: body.venue || party.venue,
            description: body.description || party.description,
            date: body.date || party.date,
            time: body.time || party.time,
            theme: body.theme || party.theme,
            budget: body.budget || party.budget,
            private: body.private || party.private,
            expense: body.expense || party.expense
          };
          var expenditure = updated.expense.reduce((cum, exp) => cum + exp.amount, 0);
          var result = yield _models.Party.updateOne({
            _id: id
          }, _objectSpread(_objectSpread({}, updated), {}, {
            total_expense: expenditure,
            updated_at: Date.now()
          }));
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
      } catch (e) {
        throw new Error('Problem creating a party');
      }
    })();
  }

}

var _default = MyEvent;
exports.default = _default;