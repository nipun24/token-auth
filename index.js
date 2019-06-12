const express = require('express');
const path = require('path');
const cors = require('cors');
const fallback = require('express-history-api-fallback');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
const port = 8080;
const root = path.join(__dirname,'./front');

var secret  = '';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(root));
app.use(fallback('index.html', { root: root }))

app.get('/', (req, res) => {
    res.sendFile(root + 'index.html');
});

app.post('/sign', (req, res) => {
    console.log(req.headers.authorization)
    // secret = req.body.key
    // jwt.sign(req.body.key, 'secret', function(err, token) {
    //     res.send({token}).sendStatus(200)
    // });
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