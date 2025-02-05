import { Router } from "express";

export const routes = Router();

routes.get("/health", (_, response) => {
  response.status(200).json({ status: "OK" });
});

routes.use((_, response) => {
  response
    .status(404)
    .json({ status: "Not Found", message: "Resource not found" });
});
