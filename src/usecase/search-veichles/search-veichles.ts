import { VehicleGateway } from "src/gateway/vehicle.gateway";
import { inject, injectable } from "tsyringe";
import { SearchVehiclesInputDto } from "./search-veichles.dto";

@injectable()
export class SearchVehicles {
  constructor(
    @inject("VehicleRepository") private vehicleRepository: VehicleGateway
  ) {}

  async execute(input: SearchVehiclesInputDto) {
    const { vehicles, total } = await this.vehicleRepository.search(input);
    return { vehicles, total };
  }
}
