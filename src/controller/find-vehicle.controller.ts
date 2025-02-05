import { Request, Response } from "express";
import { FindVehicle } from "src/usecase/find-vehicle/find-vehicle";
import { VehicleViewModel } from "src/view-model/vehicle.view-model";
import { container } from "tsyringe";

export class FindVehicleController {
  async handle(request: Request, response: Response) {
    const vehicleId = request.params.vehicleId;

    const usecase = container.resolve(FindVehicle);

    const { vehicle } = await usecase.execute({ id: vehicleId });

    response.status(200).json({ vehicle: VehicleViewModel.toHTTP(vehicle) });
  }
}
