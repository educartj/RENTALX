"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = require("../../../errors/AppError");

var _UsersRepository = require("../../../../modules/accounts/infra/typeorm/repositories/UsersRepository");

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, '64e000bc079c01b976a928a003d0b1575cc98f68');
    const userRepository = new _UsersRepository.UsersRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.AppError('User does not exist');
    }

    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError('Invalid token', 401);
  }
}