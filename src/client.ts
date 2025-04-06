import WebSocket from "ws";
import readline from "readline";

const connectClient = (port: number) => {
  const ws = new WebSocket(`ws://localhost:${port}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  ws.on("open", () => {
    console.log("Connected to server. Type messages below:\n");

    rl.on("line", (input) => {
      if (input.trim().toLowerCase() === "exit") {
        rl.close();
        ws.close();
      } else {
        ws.send(input);
      }
    });
  });

  ws.on("message", (message) => {
    console.log(`Broadcast: ${message.toString()}`);
  });

  ws.on("close", () => {
    console.log("Disconnected from server.");
    process.exit(0);
  });

  ws.on("error", (err) => {
    console.error("Connection error:", err.message);
  });
};

export default connectClient;
