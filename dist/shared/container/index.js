"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CarsImagesRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImagesRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");

// import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
// import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImagesRepository", _CarsImagesRepository.CarsImagesRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository); // container.registerSingleton<IUsersTokensRepository>(
//   "UsersTokensRepository",
//   UsersTokensRepository
// );