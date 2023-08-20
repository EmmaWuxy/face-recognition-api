const handleLogin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    db('login').where({ email })
        .select('hash')
        .then(logInData => {
            if (bcrypt.compareSync(password, logInData[0].hash)) {
                // retrieve user info
                db('users')
                    .where('email', email)
                    .select('id', 'name', 'email', 'entries', 'joined')
                    .then(user => res.json(user[0]));
            }
            else {
                res.status(400).json('log in password incorrect');
            }
        })
        .catch(err => res.status(400).json("login error"));
}

module.exports = { handleLogin }