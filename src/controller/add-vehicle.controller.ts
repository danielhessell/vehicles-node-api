import { Request, Response } from "express";
import { ApiDoc } from "src/config/doc";
import { z } from "src/config/zod";
import { AddVehicle } from "src/usecase/add-vehicle/add-vehicle";
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
    const body = request.body;

    const usecase = container.resolve(AddVehicle);

    await usecase.execute(body);

    response.sendStatus(201);
  }
}
