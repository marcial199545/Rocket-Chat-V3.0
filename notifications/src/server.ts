import express, { Application } from "express";
import config from "config";
import socketio from "socket.io";
import connectDB from "./db";
import notificationsRoutes from "./routes/api/notifications";
import { createServer } from "http";
// SECTION DB
connectDB();
// SECTION Express
const app: Application = express();
const PORT = process.env.PORT || 5001;

// SECTION Socket.io
const server = createServer(app);
const io = socketio(server);
const users = [];
const connections: any = [];

// NOTE parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// NOTE Routes
app.get("/", (req, res) => {
    res.send("notification server");
});
app.use("/api/notifications", notificationsRoutes);

server.listen(PORT, () => {
    console.log(`listening to port ${PORT} notification service 🌀 `);
});

io.on("connection", socket => {
    connections.push(socket.id);
    console.log("connnected: %s sockets connected", connections.length);
    console.log(connections);
    socket.on("send-message", () => {
        console.log("message sent");
    });
    // socket.on("JOIN_ROOM", async body => {
    //     const { roomId } = body;
    //     let prevRoom: any;
    //     if (prevRoom === undefined) {
    //         await socket.join(roomId);
    //         await io.to(roomId).emit("JOINED_ROOM", { roomId });
    //         prevRoom = roomId;
    //     }
    //     if(prevRoom !== undefined){

    //     }
    //     console.log("TCL: roomId", roomId);
    //     console.log("TCL: prevRoom", prevRoom);
    //     await socket.leave(prevRoom);
    // });
    //Disconnect
    socket.on("SOCKET_LEAVE_ROOM", (joinedRoom: any) => {
        try {
            socket.leave(joinedRoom);
        } catch (error) {
            console.log(error);
        }
    });
    socket.on("SOCKET_JOIN_ROOM", (roomId: any) => {
        try {
            socket.leaveAll();
            socket.join(roomId);
            io.emit("ROOM_JOINED", roomId);
        } catch (error) {
            console.log(error);
        }
    });
    socket.on("disconnect", () => {
        connections.splice(connections.indexOf(socket), 1);
        console.log(`<< ${socket.id} >> disconnected, ${connections.length} sockets left`);
    });
});
