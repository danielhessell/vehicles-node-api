import { Request, Response } from "express";
import { DeleteVehicle } from "src/usecase/delete-vehicle/delete-vehicle";
import { container } from "tsyringe";

export class DeleteVehicleController {
  async handle(request: Request, response: Response) {
    const vehicleId = request.params.vehicleId;

    const usecase = container.resolve(DeleteVehicle);

    await usecase.execute({
      id: vehicleId,
    });

    response.sendStatus(204);
  }
}
