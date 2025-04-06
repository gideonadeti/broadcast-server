import WebSocket, { WebSocketServer } from "ws";
import readline from "readline";

const startServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      const text = message.toString();

      console.log("Received:", text);

      // Broadcast to other clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(text);
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  wss.on("listening", () => {
    console.log(`Server running at ws://localhost:${port}`);
    console.log("You can send messages from the server to all clients.");
    console.log("If the message is 'exit' the server will shut down.\n");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", (input) => {
      const trimmed = input.trim();

      if (trimmed.toLowerCase() === "exit") {
        console.log("Shutting down server...");

        rl.close();
        wss.close(() => {
          console.log("Server stopped.");
          process.exit(0);
        });
      } else {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(`[SERVER]: ${trimmed}`);
          }
        });
      }
    });
  });

  wss.on("error", (err) => {
    if ((err as NodeJS.ErrnoException).code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use.`);
    } else {
      console.error("Server error:", (err as Error).message);
    }

    process.exit(1);
  });
};

export default startServer;
