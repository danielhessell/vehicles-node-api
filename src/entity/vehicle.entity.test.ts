import { expect } from "chai";
import { Vehicle } from "./vehicle.entity";

describe("[Domain] Vehicle", () => {
  it("should create a new Vehicle", () => {
    const vehicle = Vehicle.create({
      placa: "ABC1234",
      chassi: "12345678901234567",
      renavam: "12345678901",
      ano: 2020,
      modelo: "Uno",
      marca: "Fiat",
    });

    expect(vehicle.placa).to.be.equal("ABC1234");
    expect(vehicle.chassi).to.be.equal("12345678901234567");
    expect(vehicle.renavam).to.be.equal("12345678901");
    expect(vehicle.ano).to.be.equal(2020);
    expect(vehicle.modelo).to.be.equal("Uno");
    expect(vehicle.marca).to.be.equal("Fiat");
  });

  it("should throw an error when creating a new Vehicle with invalid plate", () => {
    expect(() => {
      Vehicle.create({
        placa: "1234",
        chassi: "12345678901234567",
        renavam: "12345678901",
        ano: 2020,
        modelo: "Uno",
        marca: "Fiat",
      });
    }).to.throw("Placa inválida");
  });

  it("should throw an error when creating a new Vehicle with invalid chassi", () => {
    expect(() => {
      Vehicle.create({
        placa: "ABC1234",
        chassi: "123",
        renavam: "12345678901",
        ano: 2020,
        modelo: "Uno",
        marca: "Fiat",
      });
    }).to.throw("Chassi inválido");
  });

  it("should throw an error when creating a new Vehicle with invalid renavam", () => {
    expect(() => {
      Vehicle.create({
        placa: "ABC1234",
        chassi: "12345678901234567",
        renavam: "123",
        ano: 2020,
        modelo: "Uno",
        marca: "Fiat",
      });
    }).to.throw("Renavam inválido");
  });
});
