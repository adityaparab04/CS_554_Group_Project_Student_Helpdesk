const express = require("express");
const path = require('path');
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const nodemailer = require('nodemailer');
var http = require('http');
const cors = require("cors");
dotenv.config({ path: './config/config.env' });

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// app.get("/", (req, res) => {res.send("Mutables chat system backend."); res.end()});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mutables.ticketing.system@gmail.com",
    pass: "CS554Project",
  },
});

app.post("/email", (req, res) => {
  const email = req.body.email;
  var mailOptions = {
    from: "mutables.ticketing.system@gmail.com",
    to: email,
    subject: "New Account",
    text: "Your Account created successfully!!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.status(200).json({success: "Message Send successfully.."});
})

io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on("joinRoom", room => {
		socket.join(room)
  })

  socket.on("newMessage", ({newMessage, room}) => {
    io.in(room).emit("getLatestMessage", newMessage)
  })

});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const port = process.env.PORT || 9000

server.listen(port, console.log(`Server Created on port ${port}`))
