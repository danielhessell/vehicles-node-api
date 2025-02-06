import { Request, Response } from "express";
import { ApiDoc } from "src/config/doc";
import { z } from "src/config/zod";
import { ValidError } from "src/errors/valid.error";
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

const pSchema = z.object({
  vehicleId: z.string().length(24),
});

ApiDoc.registerPath({
  method: "put",
  path: "/vehicles/{vehicleId}",
  tags: ["vehicles"],
  summary: "Atualiza um veículo",
  description: "Atualiza um veículo",
  request: {
    params: pSchema,
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
    const bodySchema = schema.safeParse(request.body);
    const paramSchema = pSchema.safeParse(request.params);

    if (bodySchema.success === false) {
      throw new ValidError(
        bodySchema.error.issues.map((issue) => issue.message),
        422
      );
    }

    if (paramSchema.success === false) {
      throw new ValidError(
        paramSchema.error.issues.map((issue) => issue.message),
        422
      );
    }

    const usecase = container.resolve(UpdateVehicle);

    await usecase.execute({
      id: paramSchema.data.vehicleId,
      ...bodySchema.data,
    });

    response.sendStatus(204);
  }
}
