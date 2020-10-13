// express to connect server and client
const express= require('express')
require('./db/mongoose')
const userrouter= require('./routers/user')
const taskrouter =require('./routers/task')

const app =express()
const port= process.env.PORT || 3000


app.use(express.json())
app.use(userrouter)
app.use(taskrouter)


app.listen(port,()=>{
    console.log('server is up on '+ port)
})

 const Task = require('./models/task')
 const User = require('./models/user')

const main= async()=>{
    // const task= await Task.findById('5f7dd1b1de5114071ca2ace3')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user= await User.findById('5f7f893219888e1aa87bb40b')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)


 }
 main()