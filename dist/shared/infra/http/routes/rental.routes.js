"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _express = require("express");

var _CreateRentalController = require("../../../../modules/rentals/useCases/createRental/CreateRentalController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
// import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController(); // const devolutionRentalController = new DevolutionRentalController();
// const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated // devolutionRentalController.handle
);
rentalRoutes.get("/user", _ensureAuthenticated.ensureAuthenticated // listRentalsByUserController.handle
);