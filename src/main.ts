import { Server } from "./server";

(async () => {
  try {
    const server = new Server();
    await server.start();
  } catch (error) {
    console.log(`App exited with error: ${JSON.stringify(error)}`);
  }
})();
