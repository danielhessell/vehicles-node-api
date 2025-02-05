import { Vehicle } from "src/entity/vehicle.entity";

export interface SearchInputParams {
  id?: string;
  placa?: string;
  chassi?: string;
  renavam?: string;
  marca?: string;
  modelo?: string;
  ano?: number;
  page?: number;
  size?: number;
}

export interface VehicleGateway {
  add(vehicle: Vehicle): Promise<void>;
  findById(id: string): Promise<Vehicle | null>;
  findByDocument(
    placa: string,
    chassi: string,
    renavam: string
  ): Promise<Vehicle | null>;
  search(
    params: SearchInputParams
  ): Promise<{ vehicles: Vehicle[]; total: number }>;
  save(vehicle: Vehicle): Promise<void>;
  delete(id: string): Promise<void>;
}
