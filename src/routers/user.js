const express= require('express')
//used to connect user.js (exports)
const User =require('../models/user')
const auth=require('../middleware/auth')
const router = new express.Router()
// post(to create data) vs get(to read data)

router.post('/users',async (req,res)=>{
    //constructor
    const user= new User(req.body)
    
   
    //using async await method

    try{
        await user.save()
        const token=await user.generateauthtoken()
        res.status(201).send({user,token})
    } catch (e){
        res.status(400).send(e)

    }

    //normal method
    // save data to database

    // user.save().then(()=>{
    //     res.status(201).send(user)

    // }).catch((error)=>{
    //     res.status(400)
    //     res.send(error)

    // })
})

router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateauthtoken()
        res.send({user,token})

    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()

    }catch(e){
        res.status(500).send()

    }
})

router.post('/users/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens= []
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})

//reading users details
//auth is the middleware here
router.get('/users/me', auth ,async (req,res)=>{
// then and catch are also know as promises
    res.send(req.user)
})
// //router parameter// get user by id
// router.get('/users/:id',async (req,res)=>{
//     const _id=req.params.id

//     try{
//         const user= await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)

//     }catch(e){
//         res.status(500).send(e)
//     }
    
// })

//update user
router.patch('/users/me',auth,async(req,res)=>{
    const updates= Object.keys(req.body)
    const allowedupdates = ['name','email','password','age']
    const isvalidoperation =updates.every((update)=>{
        return allowedupdates.includes(update)
    })

    if(!isvalidoperation){
        return res.status(400).send({error: 'Invalid Operations'})
    }

    try{
        updates.forEach((update)=>{
            req.user[update]= req.body[update]
            
        })
        await req.user.save()
        res.send(req.user)

    }catch(e){
        res.status(400).send(e)

    }
})

//delete user 
router.delete('/users/me',auth ,async(req,res)=>{
    try{
         await req.user.remove()
         res.send(req.user)

    }catch(e){
        res.status(500).send()

    }

})
module.exports =router 