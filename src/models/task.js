const mongoose= require('mongoose')
const validator= require('validator')


const taskschema= new mongoose.Schema({
    description: {
    type: String,
    required : true,
    trim :true
},
completed: {
    type: Boolean,
    default: false
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
}
},{
    timestamps: true
})
//task model
const Task= mongoose.model('Task',taskschema)

module.exports= Task