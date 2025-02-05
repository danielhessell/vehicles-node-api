import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import { routes } from "./routes";
import { closeMongoConnection, openMongoConnection } from "./database";
import { DomainError } from "./errors/domain.error";
import { AppError } from "./errors/app.error";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { ApiDoc } from "./config/doc";
import swaggerUi from "swagger-ui-express";
import { ValidError } from "./errors/valid.error";
import logger from "./config/logger";

export class Server {
  async start() {
    const server = express();
    server.use(express.json());
    server.use(cors());
    server.use(helmet());
    server.use(
      "/api/v1",
      (request: Request, _: Response, next: NextFunction) => {
        logger.info(`Request: ${request.method} ${request.url}`);
        next();
      },
      routes
    );

    const generator = new OpenApiGeneratorV3(ApiDoc.definitions);
    const openAPIDocument = generator.generateDocument({
      openapi: "3.0.0",
      info: {
        title: "Vehicles API",
        version: "1.0.0",
        description: "Documentação do Vehicles API",
        contact: {
          name: "Daniel Hessel",
          email: "danieldaniabreu@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8080/api/v1",
          description: "Local server",
        },
      ],
    });
    server.use("/docs/v1", swaggerUi.serve, swaggerUi.setup(openAPIDocument));

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

        if (error instanceof ValidError) {
          response.status(error.statusCode).json({
            status: error.status,
            errors: error.errors,
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
      logger.info(`Server is running on port ${process.env.PORT}!`);
    });
  }

  async stop() {
    await closeMongoConnection();
    logger.info("Server is stopped.");
  }
}
