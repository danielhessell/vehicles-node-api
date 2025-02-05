import { Vehicle } from "src/entity/vehicle.entity";
import { VehicleModelInterface } from "./vehicle.model";

export class VehicleMapper {
  static toPersistence(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      placa: vehicle.placa,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }
  static toDomain(vehicle: VehicleModelInterface) {
    return Vehicle.create({
      id: vehicle.id,
      placa: vehicle.placa,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    });
  }
}
