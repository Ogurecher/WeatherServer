const fetch = require('node-fetch');
const express = require('express');
const app = express();

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=2f58b555bf3d607911b0b6c94039442b&units=metric';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['*']);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/weather', (req, res) => {
    url = API_BASE_URL + '&q=' + req.query.city;
    fetch(url)
    .then((response) => {
        if (!response.ok){
            res.status(404).send('Not found');
            throw Error(response.statusText);
        };
        return response.json();
    })
    .then((json) => {
        res.send(json);
    });
});

app.get('/weather/coordinates', (req, res) => {
    url = API_BASE_URL + '&lat=' + req.query.lat + '&lon=' + req.query.lon;
    fetch(url)
    .then((response) => {
        if (!response.ok){
            res.status(404).send('Not found');
            throw Error(response.statusText);
        };
        return response.json();
    })
    .then((json) => {
        res.send(json);
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});