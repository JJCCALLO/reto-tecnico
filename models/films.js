'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmsSchema = new Schema({    
    title: String,
    episode_id: Number,
    opening_crawl: String,
    director: String,
    producer: String,
    release_date: Date,
    species: Array,
    starships: Array,
    vehicles: Array,
    characters: Array,
    planets: Array,
    url: String,
    created: String,
    edited: String,      
});
module.exports = mongoose.model('Films', FilmsSchema);