const mongoose = require('mongoose');
const MongoServer = require('mongodb-memory-server').MongoMemoryServer; 

MongoServer.create()
    .then(mongoServer => mongoose.connect(mongoServer.getUri(),{
        dbName: "semana-2-MariaFernanda",
    }))
    .then(()=>{
        console.info('Connected to db');
    })
    .catch(()=>{
        console.error('Error connected to db');
    })

process.on("SIGINT", ()=>{
    mongoose.disconnect();
})