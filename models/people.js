'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
    name: String,
    birth_year: String,
    eye_color: String,
    gender: String,
    hair_color: String,
    height: String,
    mass: String,
    skin_color: String,
    homeworld: String,
    films: Array,
    species: Array,
    starships: Array,
    vehicles: Array,
    url: String,
    created: String,
    edited: String    
});
module.exports = mongoose.model('People', PeopleSchema);