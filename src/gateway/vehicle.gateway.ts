import { Vehicle } from "src/entity/vehicle.entity";

export interface VehicleGateway {
  add(vehicle: Vehicle): Promise<void>;
  findByDocument(
    placa: string,
    chassi: string,
    renavam: string
  ): Promise<Vehicle | null>;
}
