const express = require('express');
const welcomeRouter = require("./welcome/welcome-router")
const actions = require("./actions/actions-router")
const projects = require("./projects/projects-router")
const cors = require('cors')

const server = express();

server.use(cors)
server.use(express.json())

server.use(welcomeRouter)
server.use(actions)
server.use(projects)

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, please try again later",
	})
})

module.exports = server;
