import { Vehicle } from "src/entity/vehicle.entity";

export interface VehicleGateway {
  add(vehicle: Vehicle): Promise<void>;
  findById(id: string): Promise<Vehicle | null>;
  findByDocument(
    placa: string,
    chassi: string,
    renavam: string
  ): Promise<Vehicle | null>;
  save(vehicle: Vehicle): Promise<void>;
}
