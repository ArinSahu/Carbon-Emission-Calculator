const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/CarbonDB");

// connect.then(()=>{
//     console.log("ho gaya db connect");
// })
// .catch(()=>{
//     console.log("nai hua db connect");
// })

const loginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    totalco2:{
        type:Number,
        default:0
    },
    history:[{
        vehicleType: {
            type: String,
            required: true
        },
        fuelType: {
            type: String,
            
        },
        distance: {
            type: Number,
            default:0
        },
        mileage: {
            type: Number,
            default:0
        },
        emission:{
            type:Number,
            required:true,
            default:0
        }
    }]
   
});

const users= new mongoose.model("users",loginSchema);

module.exports = {users};
