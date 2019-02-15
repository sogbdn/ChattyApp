// server.js
const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");

// Set the port to 3001
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
    //if (client.readyState === SocketServer.OPEN) {
    client.send(data);
    //}
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");

  ws.on("message", data => {
    const clientMessage = JSON.parse(data);
    //console.log(`User ${clientMessage.username} said ${clientMessage.content}`);
    switch (clientMessage.type) {
      case "postNotification":
        const sendingMessage = {
          content: clientMessage.content,
          id: uuidv1(),
          type: "incomingNotification"
        };
        wss.broadcast(JSON.stringify(sendingMessage));
        break;
      case "postMessage":
        break;
      default:
        console.log("Unknow type of message!");
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
