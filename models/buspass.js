
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buspassSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    branch:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    route:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    busno:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("buspass",buspassSchema);