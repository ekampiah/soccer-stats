const connections = {};
const users = {};

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString());
  const user = users[uuid];
  user.message = message;
  broadcast(uuid);

  console.log(`${user.username} sent a message: ${message}`);
};

const handleClose = (uuid) => {
  console.log(`${users[uuid].username} disconnected`);
  delete connections[uuid];
  users[uuid].message = `${users[uuid].username} left the chat`;
  broadcast(uuid);
  delete users[uuid];
};

const broadcast = (lastUserId) => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users[lastUserId]);
    connection.send(message);
  });
};

const chatServer = {
  connections,
  users,
  handleMessage,
  handleClose,
  broadcast,
};

module.exports = chatServer;
