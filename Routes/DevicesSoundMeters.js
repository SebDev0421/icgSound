
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
    

module.exports = app