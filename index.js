const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config()
const app = express()

//adding middlewares ---> regular
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookie middlewares ---->
app.use(cookieParser())

//custom  routes ---->
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes');


app.use('/api',userRouter)
app.use('/api',postRouter)


// getting request at home page---------->
app.get('/',(req,res)=>{
    res.send('Hi from youtube live')
})

// listening the server-------->
app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

