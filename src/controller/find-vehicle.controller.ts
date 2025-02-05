import { Request, Response } from "express";
import { ApiDoc } from "src/config/doc";
import { z } from "src/config/zod";
import { FindVehicle } from "src/usecase/find-vehicle/find-vehicle";
import { VehicleViewModel } from "src/view-model/vehicle.view-model";
import { container } from "tsyringe";

const schema = z.object({
  vehicleId: z.string().length(24),
});

ApiDoc.registerPath({
  method: "get",
  path: "/vehicles/{vehicleId}",
  tags: ["vehicles"],
  summary: "Encontra um veículo",
  description: "Encontra um veículo pelo id",
  request: {
    params: schema,
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            vehicle: z.object({
              id: z.string(),
              placa: z.string(),
              chassi: z.string(),
              renavam: z.string(),
              modelo: z.string(),
              marca: z.string(),
              ano: z.number(),
            }),
          }),
        },
      },
    },
  },
});

export class FindVehicleController {
  async handle(request: Request, response: Response) {
    const vehicleId = request.params.vehicleId;

    const usecase = container.resolve(FindVehicle);

    const { vehicle } = await usecase.execute({ id: vehicleId });

    response.status(200).json({ vehicle: VehicleViewModel.toHTTP(vehicle) });
  }
}
