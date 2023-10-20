const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 7010;
// Socket.io Setup
const io = require("socket.io")(server);
const { v4: uuid } = require("uuid");

var users = {};

app.set("view-engine", "ejs")
app.use(express.static('public'))
app.use("/room/:id/", express.static('public'))
app.get("/", (req, res) => {
    res.render("index.ejs")
});
app.get("/room", (req, res) => {
    res.redirect(`/room/${uuid()}`);
});
app.get("/room/:id", (req, res) => {
    res.render("room.ejs", { userId: uuid(), roomId: req.params.id });
})

io.on('connection', (socket)=> {
	console.log(socket.id);
	socket.on('new-user-joined', (username)=> {
		users[socket.id] = username;
		// console.log(users);
		socket.broadcast.emit('user-connected', username);
		io.emit('user-list', users);
	});

	socket.on('message', (data)=> {
		socket.broadcast.emit('message', {user: data.user, msg: data.msg});
	});

	socket.on("typing", (userId, username) => {
        socket.broadcast.emit("user-typing", userId, username)
    });
    socket.on('stopTyping', (userId, username) => {
    	socket.broadcast.emit('userStoppedTyping', userId, username);
  	})

	socket.on('disconnect', ()=> {
		socket.broadcast.emit('user-disconnected', user = users[socket.id]);
		delete users[socket.id];
		io.emit('user-list', users);
	});
});


server.listen(port, ()=> {
	console.log(`Server is started at PORT: ${port}`);
})









