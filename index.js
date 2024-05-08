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

app.use('/api',userRouter)

app.get('/',(req,res)=>{
    res.send('Hi from youtube live')
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

