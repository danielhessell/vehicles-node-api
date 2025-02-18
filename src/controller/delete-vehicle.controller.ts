import { Request, Response } from "express";
import { ApiDoc } from "src/config/doc";
import { z } from "src/config/zod";
import { ValidError } from "src/errors/valid.error";
import { DeleteVehicle } from "src/usecase/delete-vehicle/delete-vehicle";
import { container } from "tsyringe";

const schema = z.object({
  vehicleId: z.string().length(24),
});

ApiDoc.registerPath({
  method: "delete",
  path: "/vehicles/{vehicleId}",
  tags: ["vehicles"],
  summary: "Deleta um veículo",
  description: "Deleta um veículo",
  request: {
    params: schema,
  },
  responses: {
    204: {
      description: "No content",
    },
  },
});

export class DeleteVehicleController {
  async handle(request: Request, response: Response) {
    const paramSchema = schema.safeParse(request.params);

    if (paramSchema.success === false) {
      throw new ValidError(
        paramSchema.error.issues.map((issue) => issue.message),
        422
      );
    }

    const usecase = container.resolve(DeleteVehicle);

    await usecase.execute({
      id: paramSchema.data.vehicleId,
    });

    response.sendStatus(204);
  }
}
