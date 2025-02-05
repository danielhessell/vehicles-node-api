import { Request, Response } from "express";
import { UpdateVehicle } from "src/usecase/update-vehicle/update-vehicle";
import { container } from "tsyringe";

export class UpdateVehicleController {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const vehicleId = request.params.vehicleId;

    const usecase = container.resolve(UpdateVehicle);

    await usecase.execute({
      id: vehicleId,
      ...body,
    });

    response.sendStatus(204);
  }
}
