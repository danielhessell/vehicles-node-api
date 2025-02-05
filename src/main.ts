import "reflect-metadata";
import "./container";
import { Server } from "./server";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    `App exiting due to an unhandled promise: ${promise} and reason: ${JSON.stringify(
      reason
    )}`
  );
  throw reason;
});

process.on("uncaughtException", (error) => {
  console.log(
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
          console.log("App exited with success");
          process.exit(ExitStatus.Success);
        } catch (error) {
          console.log(`App exited with error: ${JSON.stringify(error)}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }
  } catch (error) {
    console.log(`App exited with error: ${JSON.stringify(error)}`);
    process.exit(ExitStatus.Failure);
  }
})();
