const mongoose=require('mongoose')
require('dotenv').config()
const url=process.env.Mongo_Url

const Database=async()=>{
    await mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
.then(()=>{
        console.log("Database connected")   
})
.catch((err)=>{
    console.log(err)
})
}

module.exports=Database