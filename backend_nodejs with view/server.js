import express from 'express';
const app = express();

const mysql = require("mysql")

const http = require('http').createServer(app);
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
});

const connection = mysql.createConnection({
    host:'localhost',
    port:8889,
    user:'root',
    password:'root',
    database: 'send_socket_event_to_specific_users'
});

connection.connect(function (error) {
    console.log('Database connected : ',error);
});

const users = [];

socketIO.on("connection", function (socket) {

    socket.on("connected", function (userId) {
        users[userId] = socket.id;
    });

    socket.on("sendEvent", async function (data) {
        connection.query("SELECT * FROM users WHERE id = ", data.userId,
        function (error, receiver) {
            if(receiver != null){
                if(receiver.length > 0){
                    connection.query("SELECT * FROM users WHERE id = " +
                    data.myId, function (error, sender) {
                        if(sender.length > 0){
                            var message = "New message received from: " + 
                            sender[0].name + ". Message: " + data.message;
                            socketIO.to(users[receiver[0].id])
                            .emit("messageReceived", message);
                        }
                    })
                }
            }
        })
    })
    
});

http.listen(process.env.PORT || 3000, function () {
    console.log("Server is started");
});