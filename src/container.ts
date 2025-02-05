import { container } from "tsyringe";
import { VehicleGateway } from "./gateway/vehicle.gateway";
import { VehicleRepository } from "./repository/vehicle.repository";

container.registerSingleton<VehicleGateway>(
  "VehicleRepository",
  VehicleRepository
);
