const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

const Users = require('./usersModel.js');
const secrets = require('./secrets.js');
//TODO: FINISH LOGIN ROUTER, DATA MIGRATIONS FOR USERS
router.post("/", (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ 
                    message: "Welcome!", token
                });
            } else {
                res.status(401).json({ 
                    message: "Can not access"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ 
                errorMessage: error.message
            });
        });
});

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = secret.jwtSecret;
    const options = {
        expiresIn: "5d",
    };
    return jwt.sign(payload, secret, options);
}