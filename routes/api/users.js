const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticationMiddleware = require('../../middleware/authenticationMiddleware');

const User = require('../../models/user.model.js');

/*
    API ROUTE: /api/users/register
    TYPE: POST
    DESC: Register an unregistered user
    ACCESS: Public
*/
router.post('/register', (req, res) => {
    const { name, last_name, username, email, password } = req.body;

    // Simple validation 
    if (!name || !last_name || !username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check if username is unique
    User.findOne({ username: username })
        .then(foundUsernameUser => {
            if (foundUsernameUser) return res.status(400).json({ msg: 'Username alredy registered' });
            // If all fields are valid we check if email is unique
            User.findOne({ email: email })
                .then(user => {
                    if (user) return res.status(400).json({ msg: 'Email alredy registered' });

                    // If other email exists we create a new user
                    const newUser = new User({
                        name: name,
                        last_name: last_name,
                        username: username,
                        email: email,
                        password: password
                    })

                    // Create hash for storing secure password
                    bcrypt.genSalt(10, (error, salt) => {
                        if (error) throw error;
                        bcrypt.hash(newUser.password, salt, (error, hash) => {
                            if (error) throw error;

                            // If no error, assign hash to password and register user
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {

                                    // Working with json web token
                                    jwt.sign(
                                        { id: user._id },
                                        process.env.JWT_PASS,
                                        { expiresIn: 3600 },
                                        (error, token) => {
                                            if (error) throw error;

                                            res.json({
                                                token: token,
                                                user: {
                                                    _id: user._id,
                                                    username: user.username,
                                                    name: user.name,
                                                    last_name: user.last_name,
                                                    email: user.email,
                                                }
                                            })
                                        }
                                    )
                                })
                        })
                    })
                })
                .catch(error => {
                    return res.status(400).json({ msg: 'Unexpected error while registering user' });
                });
        })
        .catch(error => {
            return res.status(400).json({ msg: 'Unexpected error while registering user' });
        });
})

/*
    API ROUTE: /api/users/login
    TYPE: POST
    DESC: Login a registered user
    ACCESS: Public
*/
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple validation 
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // If all fields are valid we check if email is unique
    User.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exists' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Usarname and password do not match' });

                    // Signing in the user
                    jwt.sign(
                        { id: user._id },
                        process.env.JWT_PASS,
                        { expiresIn: 3600 },
                        (error, token) => {
                            if (error) throw error;

                            res.json({
                                token: token,
                                user: {
                                    _id: user._id,
                                    username: user.username,
                                    name: user.name,
                                    last_name: user.last_name,
                                    email: user.email,
                                }
                            })
                        }
                    )
                })
        })
})

/*
    API ROUTE: /api/users/
    TYPE: GET
    DESC: Confirm a logged in user
    ACCESS: Private
*/
router.get('/', authenticationMiddleware, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router;