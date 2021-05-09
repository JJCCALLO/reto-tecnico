"use strict";
const modelPeople = require('../models/people');
const fechAllData = require('../utils/fechAllData');

module.exports = { create, list };

async function create (req, res) {          
    const rows = await fechAllData.getData('people');
    await modelPeople.deleteMany();   
    await modelPeople.create(rows, (err) => {
        if(err) return res.status(500).send({message: `People: Error al realizar la petición: ${err}`})        
        res.status(200).send({message: 'People: Datos guardados...'});    
    })       
}

async function list (req, res) { 
    await modelPeople.find({}, (err,data) => {
        if(err) return res.status(500).send({message: `People: Error al realizar la petición: ${err}`})
        if(!data) return res.status(404).send({message: 'People: No existen datos'})
        modelPeople.aggregate([              
            { 
                "$project":{
                "nombre": "$name", 
                "nacimiento": "$birth_year",
                "color_ojos": "$eye_color",
                "genero": "$gender",
                "color_pelo": "$hair_color",
                "altura": "$height",
                "masa": "$mass",
                "color_piel": "$skin_color",
                "mundo": "$homeworld",
                "peliculas": "$films",
                "especies": "$species",
                "naves": "$starships",
                "vehiculos": "$vehicles",
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
