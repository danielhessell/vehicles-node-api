import { Request, Response } from "express";
import { ApiDoc } from "src/config/doc";
import { z } from "src/config/zod";
import { ValidError } from "src/errors/valid.error";
import { AddVehicle } from "src/usecase/add-vehicle/add-vehicle";
import { container } from "tsyringe";

const schema = z.object({
  placa: z.string().length(7).toUpperCase().openapi({ example: "ABC1D34" }),
  chassi: z.string().length(17).openapi({ example: "8YEG8MaheTMkW6482" }),
  renavam: z.string().min(9).max(11),
  modelo: z.string(),
  marca: z.string(),
  ano: z.number(),
});

ApiDoc.registerPath({
  method: "post",
  path: "/vehicles",
  tags: ["vehicles"],
  summary: "Registra um novo veículo",
  description: "Registra um novo veículo",
  request: {
    body: {
      content: { "application/json": { schema: schema } },
    },
  },
  responses: {
    201: {
      description: "Created",
    },
  },
});

export class AddVehicleController {
  async handle(request: Request, response: Response) {
    const bodySchema = schema.safeParse(request.body);

    if (bodySchema.success === false) {
      throw new ValidError(
        bodySchema.error.issues.map((issue) => issue.message),
        422
      );
    }

    const usecase = container.resolve(AddVehicle);

    await usecase.execute(bodySchema.data);

    response.sendStatus(201);
  }
}
