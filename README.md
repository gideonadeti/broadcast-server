# Broadcast Server

A CLI app that starts a broadcast server, allowing clients to connect and send messages that are broadcast to all connected clients.

## Features

- Start and connect to a broadcast server
- Real-time message broadcasting
- Interactive terminal chat
- Multi-client simulation

## Installation

To get started, you'll need to clone the repository and install the required dependencies.

### 1. Clone the repository

```bash
git clone https://github.com/gideonadeti/broadcast-server.git
cd broadcast-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the project

```bash
npm run build
```

### 4. Link the CLI tool globally

This enables you to run the `broadcast-server` command globally

```bash
npm link
```

## Usage

### 1. Start the broadcast server

To start the broadcast server, run the following command:

```bash
broadcast-server start --port <number>
```

- `--port`: (Optional) The port to run the server on. Default is 8080.

Example:

```bash
broadcast-server start
```

### 2. Connect to the broadcast server as a client (Client 1)

To connect to the broadcast server as a client, open a new terminal and run the following command:

```bash
broadcast-server connect --port <number>
```

- `--port`: (Optional) The port to connect to. Default is 8080.

Example:

```bash
broadcast-server connect
```

### 3. Connect another client (Client 2)

To connect another client, open a new terminal and run the same command you used for Client 1.

### 4. Send a message to the broadcast server

You can send messages to the broadcast server from any of the connected clients. Simply type the message in the same terminal you used to connect to the server and press Enter. All connected clients will see the message broadcasted instantly.

### 5. Disconnect from the broadcast server

To disconnect from the broadcast server, send the message "exit" from the client terminal. The client will then disconnect from the server.

### 6. Stop the broadcast server

To stop the broadcast server, send the message "stop" from the server terminal. The server will then shut down and all connected clients will disconnect.

## Background

This project is part of the [roadmap.sh](https://roadmap.sh) backend development roadmap and can be found [here](https://roadmap.sh/projects/broadcast-server).
