import { expect } from "chai";
import sinon from "sinon";
import { Vehicle } from "src/entity/vehicle.entity";
import { FindVehicle } from "./find-vehicle";

describe("Find Vehicle", () => {
  it("should find a vehicle by id", async () => {
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

    const usecase = new FindVehicle(repository);

    await usecase.execute({ id: vehicle.id });

    expect(repository.findById.calledOnce).to.be.true;
  });

  it("should throw an error when vehicle does not exist", async () => {
    const repository = {
      findByDocument: sinon.spy(),
      add: sinon.spy(),
      findById: sinon.spy(() => Promise.resolve(null)),
      save: sinon.spy(),
      delete: sinon.spy(),
    };

    const usecase = new FindVehicle(repository);

    try {
      await usecase.execute({ id: "123" });
    } catch (error) {
      expect(error.message).to.equal("Veículo não encontrado.");
    }
  });
});
