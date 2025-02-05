import { Router } from "express";
import { AddVehicleController } from "./controller/add-vehicle.controller";

export const routes = Router();

routes.get("/health", (_, response) => {
  response.status(200).json({ status: "OK" });
});

routes.post("/vehicles", new AddVehicleController().handle);

routes.use((_, response) => {
  response
    .status(404)
    .json({ status: "Not Found", message: "Resource not found" });
});
