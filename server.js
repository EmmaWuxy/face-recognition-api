const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const login = require('./controller/login');
const register = require('./controller/register');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'emmam',
        password: 'wwj776677',
        database: 'face_rec'
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