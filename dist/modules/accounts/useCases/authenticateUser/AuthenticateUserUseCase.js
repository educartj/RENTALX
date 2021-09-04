"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class AuthenticateUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.AppError('Email or password Incorrect');
    }

    const passwordMatch = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError('Email or password Incorrect');
    }

    const token = (0, _jsonwebtoken.sign)({}, '64e000bc079c01b976a928a003d0b1575cc98f68', {
      subject: user.id,
      expiresIn: '1d'
    });
    const tokenReturn = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    };
    return tokenReturn;
  }

}) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;