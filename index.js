//modules
const express = require('express')
const colors = require('colors');
const mongoose = require('mongoose')
require('dotenv').config()
//constants
const app = express()
const port = process.env.PORT || 3000

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

mongoose.connect(process.env.URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected to mongoDB... '.bgCyan))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))