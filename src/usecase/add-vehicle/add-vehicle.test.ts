import { expect } from "chai";
import sinon from "sinon";
import { AddVehicle } from "./add-vehicle";
import { Vehicle } from "src/entity/vehicle.entity";
import { AppError } from "src/errors/app.error";

describe("Add Vehicle", () => {
  it("should add a vehicle", async () => {
    const repository = {
      findByDocument: sinon.spy(),
      add: sinon.spy(),
    };

    const usecase = new AddVehicle(repository);

    await usecase.execute({
      placa: "ABC1234",
      chassi: "12345678901234567",
      renavam: "12345678901",
      ano: 2020,
      modelo: "Uno",
      marca: "Fiat",
    });

    expect(repository.findByDocument.calledOnce).to.be.true;
    expect(repository.add.calledOnce).to.be.true;
  });

  it("should throw an error when vehicle already exists", async () => {
    const vehicle = Vehicle.create({
      placa: "ABC1234",
      chassi: "12345678901234567",
      renavam: "12345678901",
      ano: 2020,
      modelo: "Uno",
      marca: "Fiat",
    });

    const repository = {
      findByDocument: sinon.spy(() => Promise.resolve(vehicle)),
      add: sinon.spy(),
    };

    const usecase = new AddVehicle(repository);

    try {
      await usecase.execute({
        placa: "ABC1234",
        chassi: "12345678901234567",
        renavam: "12345678901",
        ano: 2020,
        modelo: "Uno",
        marca: "Fiat",
      });
    } catch (error) {
      expect(error.message).to.equal("Já existe um veículo com esse regitro.");
    }
  });
});
