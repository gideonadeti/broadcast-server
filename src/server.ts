import WebSocket, { WebSocketServer } from "ws";

const startServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log("Received:", message.toString());

      // Broadcast to all other clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`Server is running at ws://localhost:${port}`);
};

export default startServer;
