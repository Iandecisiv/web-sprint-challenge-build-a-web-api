const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authenticator = require('./authenticator.js');
const registerRouter = require('./register-router.js');
const loginRouter = require('./login-router.js');

//TODO: FINISH SETTING UP SERVER WITH NEW IMPORTS AND BETTER LAYOUT

// const welcomeRouter = require("./welcome/welcome-router")
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/register', registerRouter);
server.use('/api/actions', authenticator, actionsRouter);
server.use('/api/projects', authenticator, projectsRouter);

server.get("/", (req, res) => {
    res.json({ api: "api is a go" });
});

// server.use((err, req, res, next) => {
// 	console.log(err)

// 	res.status(500).json({
// 		message: "Something went wrong, please try again later",
// 	})
// })

module.exports = server;
