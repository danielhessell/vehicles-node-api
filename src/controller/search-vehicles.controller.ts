import { Request, Response } from "express";
import { ApiDoc } from "src/config/doc";
import { z } from "src/config/zod";
import { ValidError } from "src/errors/valid.error";
import { FindVehicle } from "src/usecase/find-vehicle/find-vehicle";
import { SearchVehicles } from "src/usecase/search-veichles/search-veichles";
import { replyGetRequestWithPagination } from "src/util/handle-pagination.util";
import { VehicleViewModel } from "src/view-model/vehicle.view-model";
import { container } from "tsyringe";

const schema = z.object({
  vehicleId: z.string().optional(),
  placa: z.string().optional(),
  chassi: z.string().optional(),
  renavam: z.string().optional(),
  modelo: z.string().optional(),
  marca: z.string().optional(),
  ano: z.number().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

ApiDoc.registerPath({
  method: "get",
  path: "/vehicles",
  tags: ["vehicles"],
  summary: "Busca veículos",
  description: "Busca veículos",
  request: {
    query: schema,
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            vehicles: z.array(
              z.object({
                id: z.string(),
                placa: z.string(),
                chassi: z.string(),
                renavam: z.string(),
                modelo: z.string(),
                marca: z.string(),
                ano: z.number(),
              })
            ),
            pagination: z.object({
              page: z.number(),
              size: z.string(),
              total: z.number(),
            }),
          }),
        },
      },
    },
  },
});

export class SearchVehiclesController {
  async handle(request: Request, response: Response) {
    const querySchema = schema.safeParse(request.query);

    if (querySchema.success === false) {
      throw new ValidError(
        querySchema.error.issues.map((issue) => issue.message),
        422
      );
    }

    const usecase = container.resolve(SearchVehicles);

    const { vehicles, total } = await usecase.execute({
      id: querySchema.data.vehicleId,
      ...querySchema.data,
    });

    const result = replyGetRequestWithPagination({
      data: vehicles.map(VehicleViewModel.toHTTP),
      total,
      page: querySchema.data.page,
      size: querySchema.data.size,
    });

    response
      .status(200)
      .json({ vehicles: result.data, pagination: result.pagination });
  }
}
