import { Server } from "socket.io";
export let io;
export const initSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*" }
    });
    io.on("connection", (socket) => {
        console.log("Client connected");
    });
};
//# sourceMappingURL=socket.js.map