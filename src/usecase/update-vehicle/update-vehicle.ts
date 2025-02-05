import { VehicleGateway } from "src/gateway/vehicle.gateway";
import { inject, injectable } from "tsyringe";
import { UpdateVehicleInputDto } from "./update-vehicle.dto";
import { Vehicle } from "src/entity/vehicle.entity";
import { AppError } from "src/errors/app.error";

@injectable()
export class UpdateVehicle {
  constructor(
    @inject("VehicleRepository") private vehicleRepository: VehicleGateway
  ) {}

  async execute(input: UpdateVehicleInputDto) {
    const vehicle = await this.vehicleRepository.findById(input.id);

    if (!vehicle) {
      throw new AppError("Veículo não encontrado.", 404);
    }

    vehicle.update(input);

    const vehicleExists = await this.vehicleRepository.findByDocument(
      vehicle.placa,
      vehicle.chassi,
      vehicle.renavam
    );

    if (vehicleExists && vehicleExists.id !== vehicle.id) {
      throw new AppError("Já existe um veículo com esse regitro.", 409);
    }

    await this.vehicleRepository.save(vehicle);
  }
}
