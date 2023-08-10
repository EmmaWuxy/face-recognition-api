const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'emmam',
      password : 'wwj776677',
      database : 'face-recognition'
    }
  });

const app = express();
app.use(express.json())
app.use(cors());

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (email === database.users[1].email && bcrypt.compareSync(password, database.users[1].password)){
        res.json(database.users[1]);
    }
    else {
        res.status(400).json('error logging in');
    }   

})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        db.insert({
            name: name,
            email: email,
            joined: new Date()
        })
        .into('users')
        .then(userId => 
            db('users')
            .where('id', userId[0])
            .select('name', 'email', 'entries', 'joined')
            .then(user => res.json(user[0]))
        )
        .catch(err => res.status(400).json('unable to register'));
    });
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db('users').where({id}).select('*')
        .then(user => {
            if (user.length){
                res.json(user[0]);
            }
            else{
                res.status(400).json('user not found');
            }
        })
        .catch(err => res.status(400).json('error getting user'));
    
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