import { AppError } from "src/errors/app.error";
import { VehicleGateway } from "src/gateway/vehicle.gateway";
import { inject, injectable } from "tsyringe";
import { DeleteVehicleInputDto } from "./delete-vehicle.dto";

@injectable()
export class DeleteVehicle {
  constructor(
    @inject("VehicleRepository") private vehicleRepository: VehicleGateway
  ) {}

  async execute(input: DeleteVehicleInputDto) {
    const vehicleExists = await this.vehicleRepository.findById(input.id);

    if (!vehicleExists) {
      throw new AppError("Veículo não encontrado.", 404);
    }

    await this.vehicleRepository.delete(input.id);
  }
}
