// server.js
const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Send the message to all connected clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");
  const nbClientConnected = wss.clients.size;
  const connectionUpdate = {
    nbClientConnected,
    type: "connectionUpdate",
    content: "a user has connected",
    id: uuidv1()
  };
  wss.broadcast(JSON.stringify(connectionUpdate));

  ws.on("message", data => {
    const clientMessage = JSON.parse(data);
    switch (clientMessage.type) {
      case "postNotification":
        const sendingNotif = {
          content: clientMessage.content,
          id: uuidv1(),
          type: "incomingNotification"
        };
        wss.broadcast(JSON.stringify(sendingNotif));
        break;
      case "postMessage":
        const sendingMessage = {
          content: clientMessage.content,
          username: clientMessage.username,
          id: uuidv1(),
          type: "incomingMessage"
        };
        wss.broadcast(JSON.stringify(sendingMessage));
        break;
      default:
        console.log("Unknow type of message!");
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    const nbClientConnected = wss.clients.size;
    const connectionUpdate = {
      nbClientConnected,
      type: "connectionUpdate",
      content: "a user has disconnected",
      id: uuidv1()
    };
    wss.broadcast(JSON.stringify(connectionUpdate));
  });
});
