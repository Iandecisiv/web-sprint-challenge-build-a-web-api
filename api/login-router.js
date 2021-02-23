const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const Users = require('./usersModel.js');
const secrets = require('./secrets.js');
//TODO: FINISH LOGIN ROUTER, DATA MIGRATIONS FOR USERS
router.post("/", (req, res) => {
    let { username,}
})