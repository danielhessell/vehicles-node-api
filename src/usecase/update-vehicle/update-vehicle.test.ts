import { expect } from "chai";
import sinon from "sinon";
import { Vehicle } from "src/entity/vehicle.entity";
import { UpdateVehicle } from "./update-vehicle";

describe("Update Vehicle", () => {
  it("should update a vehicle", async () => {
    const vehicle = Vehicle.create({
      placa: "ABC1234",
      chassi: "12345678901234567",
      renavam: "12345678901",
      ano: 2020,
      modelo: "Uno",
      marca: "Fiat",
    });

    const repository = {
      findByDocument: sinon.spy(),
      add: sinon.spy(),
      findById: sinon.spy(() => Promise.resolve(vehicle)),
      save: sinon.spy(),
      delete: sinon.spy(),
    };

    const usecase = new UpdateVehicle(repository);

    await usecase.execute({
      id: vehicle.id,
      placa: "ABC1234",
      chassi: "12345678901234567",
      renavam: "12345678901",
      ano: 2024,
      modelo: "Onix",
      marca: "GM",
    });

    expect(repository.findByDocument.calledOnce).to.be.true;
    expect(repository.save.calledOnce).to.be.true;
    expect(vehicle.ano).to.equal(2024);
    expect(vehicle.modelo).to.equal("Onix");
    expect(vehicle.marca).to.equal("GM");
  });

  it("should throw an error when vehicle does not exist", async () => {
    const repository = {
      findByDocument: sinon.spy(),
      add: sinon.spy(),
      findById: sinon.spy(() => Promise.resolve(null)),
      save: sinon.spy(),
      delete: sinon.spy(),
    };

    const usecase = new UpdateVehicle(repository);

    try {
      await usecase.execute({
        id: "123",
        placa: "ABC1234",
        chassi: "12345678901234567",
        renavam: "12345678901",
        ano: 2024,
        modelo: "Onix",
        marca: "GM",
      });
    } catch (error) {
      expect(error.message).to.equal("Veículo não encontrado.");
    }
  });

  it("should throw an error when vehicle already exists with the same document", async () => {
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
      findById: sinon.spy(() => Promise.resolve(vehicle)),
      save: sinon.spy(),
      delete: sinon.spy(),
    };

    const usecase = new UpdateVehicle(repository);

    try {
      await usecase.execute({
        id: vehicle.id,
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
