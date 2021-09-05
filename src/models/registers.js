const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

//now we create a collection
const Register = new mongoose.model("Student",employeeSchema);
module.exports= Register;