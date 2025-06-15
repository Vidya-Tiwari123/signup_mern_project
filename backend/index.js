const express = require('express');
const app = express();
const Productrouter  = require('./routes/Productrouter')
require('dotenv').config();
const bodyparser = require('body-parser');
const cors = require('cors');
require('./Models/db')
const AuthRouter = require('./routes/AuthRouter')

const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG')
})

app.use(bodyparser.json());
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/products',Productrouter)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})