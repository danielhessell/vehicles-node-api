import { Request, Response } from "express";
import { AddVehicle } from "src/usecase/add-vehicle/add-vehicle";
import { container } from "tsyringe";

export class AddVehicleController {
  async handle(request: Request, response: Response) {
    const body = request.body;

    const usecase = container.resolve(AddVehicle);

    await usecase.execute(body);

    response.sendStatus(201);
  }
}
