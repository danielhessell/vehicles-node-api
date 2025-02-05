import { expect } from "chai";
import sinon from "sinon";
import { Vehicle } from "src/entity/vehicle.entity";
import { DeleteVehicle } from "./delete-vehicle";

describe("Delete Vehicle", () => {
  it("should delete a vehicle", async () => {
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

    const usecase = new DeleteVehicle(repository);

    await usecase.execute({
      id: vehicle.id,
    });

    expect(repository.findById.calledOnce).to.be.true;
    expect(repository.delete.calledOnce).to.be.true;
  });

  it("should throw an error if vehicle does not exist", async () => {
    const repository = {
      findByDocument: sinon.spy(),
      add: sinon.spy(),
      findById: sinon.spy(() => Promise.resolve(null)),
      save: sinon.spy(),
      delete: sinon.spy(),
    };

    const usecase = new DeleteVehicle(repository);

    try {
      await usecase.execute({
        id: "123",
      });
    } catch (error) {
      expect(error.message).to.be.equal("Veículo não encontrado.");
      expect(error.statusCode).to.be.equal(404);
    }
  });
});
