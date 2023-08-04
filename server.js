const express = require('express');

const app = express();
app.use(express.json())

const database = {
    users: [
        {
            id: '123',
            name: 'emma',
            email: 'emma@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('success');
    } else {
        res.status(400).json('error logging in');
    }

})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    database.users.push({
        id: '122',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.send(database.users[database.users.length-1]);
})

app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;
    const user = database.users.find((user) => user.id === userId);
    if (user){
        res.json(user);
    }
    else{
        res.status(400).json('user not found');
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    const user = database.users.find((user) => user.id === id);
    if (user){
        user.entries++;
        res.json(user.entries);
    }
    else{
        res.status(400).json('user not found');
    }
})