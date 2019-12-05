const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=2f58b555bf3d607911b0b6c94039442b&units=metric';
const MONGODB_URL = 'mongodb://localhost:27017/weatherdb';

let db;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['*']);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

app.get('/weather', (req, res) => {
    url = API_BASE_URL + '&q=' + req.query.city;
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        };
        return response.json();
    })
    .then((json) => {
        res.send(json);
    })
    .catch((error) => {
        if (error.code !== 'ECONNRESET') {
            res.status(404).send('City not found');   
        } else {
            res.status(500).send('Connection reset');
        }
    });
});

app.get('/weather/coordinates', (req, res) => {
    url = API_BASE_URL + '&lat=' + req.query.lat + '&lon=' + req.query.lon;
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        };
        return response.json();
    })
    .then((json) => {
        res.send(json);
    })
    .catch((error) => {
        if (error.code !== 'ECONNRESET') {
            res.status(404).send('Location not found');
        } else {
            res.status(500).send('Connection reset');
        }
    });
});

app.get('/favourites', (req, res) => {
    db.collection('favourites').find().toArray((err, result) => {
        if (err) throw err;
        
        const body = result.map((document) => {
            return document.cityName;
        });

        res.send(JSON.stringify(body));
    });
});

app.post('/favourites', (req, res) => {
    db.collection('favourites').update(req.body, req.body, { upsert: true }, (err, result) => {
        if (err) throw err;

        console.log(`saved ${req.body}`);

        const success = { status: 'insert successful'};
        res.send(JSON.stringify(success));
    })
});

app.delete('/favourites', (req, res) => {
    db.collection('favourites').deleteOne(req.body, (err, result) => {
        if (err) throw err;

        console.log(`deleted ${req.body}`);

        const success = { status: 'delete successful'};
        res.send(JSON.stringify(success));
    });
});


MongoClient.connect(MONGODB_URL, (err, client) => {
    if (err) throw err;

    db = client.db('weatherdb');

    app.listen(3000, () => {
        console.log('App listening on port 3000');
    });
});