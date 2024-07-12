const express=require('express');
const Database = require('./config/db');
const app=express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

Database()


app.use('/test',require('./routes/register'))
app.use('/test',require('./routes/auth'))

app.use('/test',require('./routes/products'))

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is listening on port: ${port}`)
})
