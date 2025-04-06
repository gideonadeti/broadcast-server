#!/usr/bin/env node

import { Command } from "commander";

import connectClient from "./client";
import { startServer, stopServer } from "./server";

const program = new Command();

program
  .name("broadcast-server")
  .description("A simple CLI-based broadcast server")
  .version("1.0.0");

program
  .command("start")
  .description("Start the WebSocket server")
  .option("--port <port>", "Port to listen on", "8080")
  .action((options) => {
    const port = parseInt(options.port, 10);

    startServer(port);
  });

program
  .command("connect")
  .description("Connect to the broadcast server as a client")
  .option("--port <port>", "Port to connect to", "8080")
  .action((options) => {
    const port = parseInt(options.port, 10);

    connectClient(port);
  });

program
  .command("stop")
  .description("Stop the WebSocket server")
  .option("--port <port>", "Port to stop the server on", "8080")
  .action((options) => {
    const port = parseInt(options.port, 10);

    stopServer(port);
  });

program.parse(process.argv);
