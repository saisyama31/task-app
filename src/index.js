// express to connect server and client
const express= require('express')
require('./db/mongoose')
const userrouter= require('./routers/user')
const taskrouter =require('./routers/task')

const app =express()
const port= process.env.PORT 


app.use(express.json())
app.use(userrouter)
app.use(taskrouter)


app.listen(port,()=>{
    console.log('server is up on '+ port)
})
