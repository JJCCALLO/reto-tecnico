"use strict";
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const AWS = require('aws-sdk')
const uuid = require('node-uuid')

const mongoose = require('mongoose')


const { TODOS_TABLE, IS_OFFLINE } = process.env

const dynamoDb =
  IS_OFFLINE === 'true'
    ? new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      })
    : new AWS.DynamoDB.DocumentClient()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routes/films')(app);
require('./routes/people')(app);


mongoose.connect('mongodb://localhost:27017/swapi', (err, res) => {
    if(err){
        return console.log(`Error al conectar ala base datos: ${err}`)
    }
    console.log('Conexión establecida a MongoDB')
    let port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Listening to port ${port}`));
})

module.exports = serverless(app)
