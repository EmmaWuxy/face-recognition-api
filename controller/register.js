const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    var hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        // insert signin info
        db.insert({
            email: email,
            hash: hash
        })
            .into('login')
            .transacting(trx)
            .then(signinId => {
                // insert users info
                return db.insert({
                    name: name,
                    email: email,
                    joined: new Date()
                })
                    .into(('users'))
                    .transacting(trx)
                    .then(userId => {
                        // pass the registered user info back to frontend
                        return db('users')
                            .where('id', userId[0])
                            .select('id', 'name', 'email', 'entries', 'joined')
                            .transacting(trx);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .then(user => res.json(user[0]))
        .catch(err => res.status(400).json('unable to register'));
}

module.exports = {handleRegister};