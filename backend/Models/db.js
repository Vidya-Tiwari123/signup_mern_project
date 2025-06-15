const mongoose  = require("mongoose");

const mongo_url = process.env.MONGO_COMM;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("Mongoose connected...")
}).catch((err)=>{
    console.log('Mongodb connection error',err)
})