const express = require('express');
const hostname = '0.0.0.0';
const port = 3000;
const server = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/apinode');

server.use(express.urlencoded());
server.use(express.json());

// Routes
const userRoute = require("./routes/userRoute");
userRoute(server);

const musicRoute = require("./routes/musicRoute");
musicRoute(server);

server.listen(port, hostname, () => {
    console.log(`Example app listening on ${hostname} port ${port}`)
});