const { PAT, USER_ID, APP_ID, MODEL_ID } = require('../config')

const handleImageDetection = (req, res) => {
    const { imageUrl } = req.body;
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl
                    }
                }
            }
        ]
    });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => res.status(400).json('clarifai api error'));
}

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

module.exports = { handleImageDetection, handleImage };