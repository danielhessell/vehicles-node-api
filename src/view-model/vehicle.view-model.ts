import { Vehicle } from "src/entity/vehicle.entity";

export class VehicleViewModel {
  static toHTTP(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      placa: vehicle.placa,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      ano: vehicle.ano,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
    };
  }
}
