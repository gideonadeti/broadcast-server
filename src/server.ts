import WebSocket, { WebSocketServer } from "ws";

let wss: WebSocketServer | null = null;

export const startServer = (port: number) => {
  if (wss) {
    console.log("Server is already running.");

    return;
  }

  wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log("Received:", message.toString());

      // Broadcast to all other clients
      if (wss) {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
          }
        });
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`Server is running at ws://localhost:${port}`);
};

export const stopServer = (port: number) => {
  if (wss) {
    console.log(`Stopping the WebSocket server on port ${port}...`);

    wss.close(() => {
      console.log("Server stopped gracefully.");

      wss = null;
    });
  } else {
    console.log(`No server running on port ${port}.`);
  }
};
