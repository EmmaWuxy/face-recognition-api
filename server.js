const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('./config')

const login = require('./controller/login');
const register = require('./controller/register');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = require('knex')({
    client: 'mysql',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }
});

const app = express();
app.use(express.json())
app.use(cors());

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

// Routing Table
app.post('/login', login.handleLogin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageDetect', image.handleImageDetection);