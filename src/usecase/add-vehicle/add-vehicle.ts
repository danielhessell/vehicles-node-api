import { VehicleGateway } from "src/gateway/vehicle.gateway";
import { inject, injectable } from "tsyringe";
import { AddVehicleInputDto } from "./add-vehicle.dto";
import { Vehicle } from "src/entity/vehicle.entity";
import { AppError } from "src/errors/app.error";

@injectable()
export class AddVehicle {
  constructor(
    @inject("VehicleRepository") private vehicleRepository: VehicleGateway
  ) {}

  async execute(input: AddVehicleInputDto) {
    const vehicleExists = await this.vehicleRepository.findByDocument(
      input.placa,
      input.chassi,
      input.renavam
    );

    if (vehicleExists) {
      throw new AppError("Já existe um veículo com esse regitro.", 409);
    }

    const vehicle = Vehicle.create(input);

    await this.vehicleRepository.add(vehicle);
  }
}
