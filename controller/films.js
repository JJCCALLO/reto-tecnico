"use strict";
const modelFilms = require('../models/films');
const fechAllData = require('../utils/fechAllData');

module.exports = { create, list };

async function create (req, res) {          
    const rows = await fechAllData.getData('films');
    await modelFilms.deleteMany();   
    await modelFilms.create(rows, (err) => {
        if(err) return res.status(500).send({message: `Films: Error al realizar la petición: ${err}`})        
        res.status(200).send({message: 'Films: Datos guardados...'});    
    })       
}

async function list (req, res) { 
    await modelFilms.find({}, (err,dataList) => {
        if(err) return res.status(500).send({message: `Films: Error al realizar la petición: ${err}`})
        if(!dataList) return res.status(404).send({message: 'Films: No existen datos'})
        modelFilms.aggregate([              
        { 
            "$project":{
            "titulo": "$title", 
            "episodio": "$episode_id",
            "apertura": "$opening_crawl",
            "director": "$director",
            "productor": "$producer",
            "fecha": "$release_date",
            "especie": "$species",
            "nave": "$starships",
            "vehiculo": "$vehicles",
            "caracter": "$characters",
            "planeta": "$planets",
            "url": "$url",
            "creado": "$created",
            "editado": "$edited",
        }}],
        function( err, data ) {          
            if ( err )throw err;                      
            res.send(200, data)    
        });        
    })
};