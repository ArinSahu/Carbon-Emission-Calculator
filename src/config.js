const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/CarbonDB");

connect.then(()=>{
    console.log("ho gaya db connect");
})
.catch(()=>{
    console.log("nai hua db connect madarchod");
})

const loginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const users= new mongoose.model("users",loginSchema);

module.exports = {users};