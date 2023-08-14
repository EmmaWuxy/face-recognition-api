const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where({ id }).increment('entries', 1)
        .then(isSuccess => {
            if (isSuccess) {
                db('users').where({ id }).select('entries')
                    .then(entries => res.json(entries[0]))
            }
            else {
                res.status(400).json('unable to get entries')
            }
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {handleImage};