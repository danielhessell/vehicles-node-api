import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import { routes } from "./routes";
import { closeMongoConnection, openMongoConnection } from "./database";
import { DomainError } from "./errors/domain.error";
import { AppError } from "./errors/app.error";

export class Server {
  async start() {
    const server = express();
    server.use(express.json());
    server.use(cors());
    server.use(helmet());
    server.use("/api/v1", routes);

    server.use(
      (
        error: Error,
        _request: Request,
        response: Response,
        _next: NextFunction
      ) => {
        if (error instanceof DomainError) {
          response.status(error.statusCode).json({
            status: error.status,
            message: error.message,
          });
          return;
        }

        if (error instanceof AppError) {
          response.status(error.statusCode).json({
            status: error.status,
            message: error.message,
          });
          return;
        }

        response.status(500).json({
          statusCode: 500,
          message: `Internal server error - ${error.message}`,
        });
        return;
      }
    );

    await openMongoConnection();

    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}!`);
    });
  }

  async stop() {
    await closeMongoConnection();
    console.log("Server is stopped.");
  }
}
