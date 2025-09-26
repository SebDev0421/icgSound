
const { MongoClient } = require('mongodb');
const express = require('express'),
    app = express()

// URL de tu Mongo (ej: local o Atlas)
const uri = "mongodb://icgAdmin:Fenoco1111@164.92.89.77:27017/admin"; 
const client = new MongoClient(uri);

app.put('/lastData', async(req, res) => {
    const {id} = req.body
    await client.connect();
    const db = client.db("proyecto1111");
    const collection = db.collection(id);

    const lastDoc = await collection
        .find()
        .sort({ register: -1 })
        .limit(1)
        .toArray();
    
    res.json({message: 'ok', data: lastDoc})
})


function toCompactDate(isoString) {
  const d = isoString;
  console.log("day toCompactDate:", d.getDate());
  const pad = (n) => n.toString().padStart(2, "0");
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()+1) +
    "000000"
  );
}

app.post('/dayData', async(req, res) => {
    const {id, date} = req.body
    console.log("Request dayData for id:", id, "and date:", date);
    await client.connect();
    const db = client.db("proyecto1111");
    const collection = db.collection(id);
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1); // Sumar un día para incluir todo el día

    //format date in database is 20250915000000

    console.log("Fetching data from", start, "to", end);

    const startFormatted = parseInt(toCompactDate(start));
    const endFormatted = parseInt(toCompactDate(end));

    console.log("Formatted dates:", startFormatted, endFormatted);
    //section to fetch data between start and end

    const docs = await collection
        .find({ register: { $gte: startFormatted, $lt: endFormatted } })
        .sort({ register: 1 }) // Ordenar por fecha ascendente
        .toArray();

    res.json({message: 'ok', data: docs})
})


    

module.exports = app