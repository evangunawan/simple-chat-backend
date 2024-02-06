# Simple Chat Backend

### About
A simple chat backend application written using Node.js with NestJS framework.
It connects and uses RabbitMQ as a message broker to ensure message delivery and availability.
It also uses socket.io as a socket server to notify frontend or clients on receiving new messages.

### Architecture
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

### Improvement Room
Beside of the scalability and efficient application, this application has a lot room of improvements,
such as:
- Add a message read receipt, or message delivery status, using websocket and databases to store the status.
- Refactor app socket gateway, since NestJS has its approach for WebSocket, socket server is provided and accessed from a singleton class. 
- Add a database (such as MongoDB), to support rooms, logs, and users.

