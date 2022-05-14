const express = require("express")
const { Server } = require("socket.io");
const nodemailer = require('nodemailer');
var http = require('http');
const cors = require("cors")

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

app.get("/", (req, res) => {res.send("Mutables chat system backend."); res.end()});

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

const port = process.env.PORT || 9000

server.listen(port, console.log(`Server Created on port ${port}`))
