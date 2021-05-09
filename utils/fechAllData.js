"use strict";
const axios = require('axios')

module.exports = { getData };

async function getData(param) {
    const url = `https://swapi.py4e.com/api/${param}`
    const response = await axios.get(`${url}`)
    let  data = await response.data.results    
    return data
}