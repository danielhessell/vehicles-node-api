import "reflect-metadata";
import "./container";
import { Server } from "./server";
import logger from "./config/logger";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${JSON.stringify(
      reason
    )}`
  );
  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(
    `App exiting due to an uncaught exception: ${JSON.stringify(error)}`
  );
  process.exit(ExitStatus.Failure);
});

process.removeAllListeners("warning");

(async (): Promise<void> => {
  try {
    const server = new Server();
    await server.start();

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          await server.stop();
          logger.info("App exited with success");
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(`App exited with error: ${JSON.stringify(error)}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }
  } catch (error) {
    logger.error(`App exited with error: ${JSON.stringify(error)}`);
    process.exit(ExitStatus.Failure);
  }
})();
