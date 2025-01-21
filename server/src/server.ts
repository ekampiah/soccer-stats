import { RawData, WebSocketServer } from "ws";
import { createServer, IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";
import { generateUsername } from "unique-username-generator";

const httpServer = createServer();
const wsServer = new WebSocketServer({ server: httpServer });

const port = process.env.PORT || 8000;

console.log("Starting WebSocket server on port " + port);

const connections: { [id: string]: WebSocket } = {};
const users: { [id: string]: { username: string; message?: string } } = {};

const handleMessage = (bytes: RawData, uuid: string) => {
  const message = JSON.parse(bytes.toString());
  const user = users[uuid];
  user.message = message;
  broadcast(uuid);

  console.log(`${user.username} sent a message: ${message}`);
};

const handleClose = (uuid: string) => {
  console.log(`${users[uuid].username} disconnected`);
  delete connections[uuid];
  users[uuid].message = `${users[uuid].username} left the chat`;
  broadcast(uuid);
  delete users[uuid];
};

const broadcast = (lastUserId: string) => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users[lastUserId]);
    connection.send(message);
  });
};

wsServer.addListener(
  "connection",
  (connection: WebSocket, request: IncomingMessage) => {
    if (!request.url) return;
    const username = generateUsername();
    const uuid = uuidv4();
    connections[uuid] = connection;
    users[uuid] = { username };
    console.log(`Joined chat as ${username}`);
    connection.send(JSON.stringify(`Joined chat as ${username}`));
    connection.addEventListener("message", (message: MessageEvent) =>
      handleMessage(message.data, uuid)
    );
    connection.addEventListener("close", () => handleClose(uuid));
  }
);

httpServer.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
