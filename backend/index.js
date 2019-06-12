const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
const port = 8080;

var secret  = '';

app.use(cors());
app.use(bodyParser.json());

app.post('/sign', (req, res) => {
    secret = req.body.key
    jwt.sign(req.body.key, 'secret', function(err, token) {
        res.send({token})
    });
});

app.get('/verify', (req, res) => {
    var bearer = req.headers.authorization.split(' ')[1]
    jwt.verify(bearer, 'secret', function(err, decoded) {
        if(decoded === secret){
            res.sendStatus(200)
        }
        else {
            res.sendStatus(404)
        }
    });
            
});


app.listen(port, () => console.log(`App listening on ${port}!`));