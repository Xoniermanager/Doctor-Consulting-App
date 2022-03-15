const app = require('./app');
const dotenv = require('dotenv');
const server = require('http').createServer(app);
const socket = require('socket.io');

// Handling Uncaught error
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Sutting down the server due to Uncaught Exception');
    process.exit(1);
})


// config
dotenv.config({path : 'config/config.env'});
// connect database
const connectDatabase = require('./config/database');
connectDatabase(); 

const PORT = process.env.PORT;

const io = socket(server, {
    cors : {
        origin : "*",
        methods : ['GET', 'POST']
    }
});




io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`));

// Unhandled Promise rejection 
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Sutting down the server due to Unhandle Promise Rejection');
    server.close(()=>{
        process.exit(1);
    });
})