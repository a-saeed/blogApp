//modules
const express = require('express')
const colors = require('colors');
const mongoose = require('mongoose')
require('dotenv').config()
const authRoute = require('./routes/auth');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
//constants
const app = express()
const port = process.env.PORT || 3000
//mongoose connection
mongoose.connect(process.env.URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected to mongoDB... '.bgCyan))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))

//middleware
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoute);
//user functionalities
app.use("/api/user", userRouter)
//post functionalities
app.use("/api/post", postRouter)
//error handler middleware
app.use((err, req, res, next) => {
    res.statusCode = err.statusCode;
    res.send({
        error: err
    })
})
app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))