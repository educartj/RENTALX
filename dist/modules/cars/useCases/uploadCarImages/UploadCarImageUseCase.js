"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ICarsImagesRepository = require("../../repositories/ICarsImagesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let UploadCarImagesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsImagesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsImagesRepository.ICarsImagesRepository === "undefined" ? Object : _ICarsImagesRepository.ICarsImagesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UploadCarImagesUseCase {
  constructor(carsImagesRepository //@inject("StorageProvider")
  //private storageProvider: IStorageProvider
  ) {
    this.carsImagesRepository = carsImagesRepository;
  }

  async execute({
    car_id,
    images_name
  }) {
    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image); // await this.storageProvider.save(image, "cars");
    });
  }

}) || _class) || _class) || _class) || _class);
exports.UploadCarImagesUseCase = UploadCarImagesUseCase;