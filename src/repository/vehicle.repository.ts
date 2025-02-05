import { Vehicle } from "src/entity/vehicle.entity";
import { VehicleGateway } from "src/gateway/vehicle.gateway";
import { VehicleModel } from "./vehicle.model";
import { VehicleMapper } from "./vehicle.mapper";

export class VehicleRepository implements VehicleGateway {
  private repository = VehicleModel;

  async add(vehicle: Vehicle): Promise<void> {
    await this.repository.create(VehicleMapper.toPersistence(vehicle));
  }

  async findByDocument(
    placa: string,
    chassi: string,
    renavam: string
  ): Promise<Vehicle | null> {
    const vehicle = await this.repository.findOne({
      $or: [{ placa }, { chassi }, { renavam }],
    });
    if (!vehicle) return null;
    return VehicleMapper.toDomain(vehicle);
  }
}
