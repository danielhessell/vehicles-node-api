import { Router } from "express";
import { AddVehicleController } from "./controller/add-vehicle.controller";
import { FindVehicleController } from "./controller/find-vehicle.controller";
import { UpdateVehicleController } from "./controller/update-vehicle.controller";

export const routes = Router();

routes.get("/health", (_, response) => {
  response.status(200).json({ status: "OK" });
});

routes.get("/vehicles/:vehicleId", new FindVehicleController().handle);
routes.post("/vehicles", new AddVehicleController().handle);
routes.put("/vehicles/:vehicleId", new UpdateVehicleController().handle);

routes.use((_, response) => {
  response
    .status(404)
    .json({ status: "Not Found", message: "Resource not found" });
});
