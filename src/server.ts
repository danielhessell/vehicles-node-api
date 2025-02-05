import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import { routes } from "./routes";

export class Server {
  async start() {
    const server = express();
    server.use(express.json());
    server.use(cors());
    server.use(helmet());
    server.use("/api/v1", routes);

    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}!`);
    });
  }

  async stop() {
    console.log("Server is stopped.");
  }
}
