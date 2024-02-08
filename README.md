# Chat Backend

## About
Welcome to chat backend application written using Node.js with NestJS framework.
A scalable, highly available real-time chat application written using TypeScript in Node.js.
It also uses RabbitMQ as a message broker to ensure message delivery and availability.

## Architecture
It uses clean architecture as the base of the project.
We separate core process (such as usecases and entities) and the infrastructure connections used.
Clean architecture used for more cleaner, maintainable,
readable code and also supporting easier infrastructure changes and updates.

The project itself utilizes NestJS's dependency injection and modules to support the clean architecture approach.
We can *plug n play* the infrastructure and frameworks needed to supply our usecases within NestJS modules.

The application infrastructure mainly uses Rest API as a transport between client and this application.
For example, frontend application can send chat message via REST API
(which we can add more approach easily, since we are using clean architecture),
the message then will be send to the RabbitMQ queue to ensure message delivery.

Beside publishing message to the message broker, this application also actively consuming message from the same queue,
which will be consumed and process the message, such as sending notification to the frontend/client via websocket.

On the other side, the application supports horizontal scalability, which supported natively using RabbitMQ,
we also provided Redis as a socket.io adapter to support multiple nodes magically.

## Setup
Check these following steps to help you get started.
#### Requirements
This project needs active RabbitMQ and Redis connection to run.
You can run the infrastructures needed included in `docker-compose.yml`.

#### Running
To setup a Node.js project, you can clone the project, open terminal and install dependencies.
This project is recommended to use Node.js v18.x to run.
```bash
$ npm install
```

#### Run the application
To run the application, open up terminal and navigate to the project directory.
Run the command below to start development server.
```bash
# Run a development server
$ npm run start:dev

# Run a production server
$ npm run start:prod
```

## API
This application allows you to chat inside a room, with multiple participants/clients.
You can use sockets to join and listen chat messages in a room, and REST API to send a chat message to a room.

#### Sending a chat message to a Room
`POST /chat-messages`
```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"content": "Hello world", "clientId": "evangunawan", "roomId": "ROOMONE"}' http://localhost:8080/chat-messages 
```
Which will send a message into room `roomId`.
It accepts JSON body, which concludes:
- `content` string: Message content.
- `clientId` string: The sender clientId, can be generated or a plain string.
- `roomId` string: Target room to send the message to.

#### Connecting and receiving message in a room
To connect and join room, you can emit a socket event from the frontend/client for example:
```js
socketClient.emit('joinroom', `${roomName}`);
```
and you can listen to `chat` event to receive real-time messages.
```js
socketClient.on(`chat`, (message) => {
  console.log(message);
});
```

## Improvement Room
Beside of the scalability and efficient application, this application has a lot room of improvements,
such as:
- Add a message read receipt, or message delivery status, using websocket and databases to store the status.
- Refactor app socket gateway, since NestJS has its approach for WebSocket, socket server is provided and accessed from a singleton class. 
- Add a database (such as MongoDB), to support rooms, logs, and users.
- Add room features such as room password and API authentication to create/post a message. 
