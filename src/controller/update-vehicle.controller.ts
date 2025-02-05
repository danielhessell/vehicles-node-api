import { Request, Response } from "express";
import { ApiDoc } from "src/config/doc";
import { z } from "src/config/zod";
import { UpdateVehicle } from "src/usecase/update-vehicle/update-vehicle";
import { container } from "tsyringe";

const schema = z.object({
  placa: z.string().min(7).max(7),
  chassi: z.string().min(17).max(17),
  renavam: z.string().min(11).max(11),
  modelo: z.string(),
  marca: z.string(),
  ano: z.number(),
});

ApiDoc.registerPath({
  method: "put",
  path: "/vehicles/{vehicleId}",
  tags: ["vehicles"],
  summary: "Atualiza um veículo",
  description: "Atualiza um veículo",
  request: {
    params: z.object({
      vehicleId: z.string().length(24),
    }),
    body: {
      content: { "application/json": { schema: schema } },
    },
  },
  responses: {
    204: {
      description: "No content",
    },
  },
});

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
