import { VehicleGateway } from "src/gateway/vehicle.gateway";
import { inject, injectable } from "tsyringe";
import { Vehicle } from "src/entity/vehicle.entity";
import { AppError } from "src/errors/app.error";
import { FindVehicleInputDto } from "./find-vehicle.dto";

@injectable()
export class FindVehicle {
  constructor(
    @inject("VehicleRepository") private vehicleRepository: VehicleGateway
  ) {}

  async execute(input: FindVehicleInputDto) {
    const vehicleExists = await this.vehicleRepository.findById(input.id);

    if (!vehicleExists) {
      throw new AppError("Veículo não encontrado.", 404);
    }

    return { vehicle: vehicleExists };
  }
}
