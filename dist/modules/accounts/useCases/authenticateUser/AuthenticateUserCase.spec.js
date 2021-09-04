"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let createUserUseCase;
let usersRepositoryInMemory;
let authenticateUserUseCase;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate', async () => {
    const user = {
      name: 'User Teste',
      email: 'user@example.com',
      password: '1234',
      driver_license: '000123'
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'user@example.com',
        password: '1234'
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user = {
        driver_license: '9999',
        email: 'user@example.com',
        password: '1234',
        name: 'User Test Error'
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword'
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});