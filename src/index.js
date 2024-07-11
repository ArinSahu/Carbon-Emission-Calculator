const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const {users}=require('./config');
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await users.findOne({ name: data.name });
    if (existingUser) {
        res.render("signup",{message:"User already exists"});
    }
    else {
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltrounds);
        data.password = hashedPassword;
        const userData = await users.insertMany(data);
        //console.log(userData);
        res.render("login");
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await users.findOne({ name: req.body.username });
        if (!check) {
            res.render("login",{message:"User not found"});
        }
        else{
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            // console.log(isPasswordMatch);
            if (isPasswordMatch) {
                res.render("home",{user: req.body.username});
            }
            else {
                res.render("login", { message: "Wrong password" });
            }
        }
    } catch {
        res.send("Wrong details");
    }
});

app.post("/type",async(req,res)=>{
    const user = req.body.user;
    const vehicleType=req.body.vehicleType;
    const fuelType = vehicleType === "flight" ? "none" : req.body.fuelType;
    //console.log(fuelType);
    res.render("home",{user:user,vehicleType:vehicleType,fuelType:fuelType});
})

app.post("/calculate",async(req,res)=>{
    const user=req.body.user;
    const distance=req.body.distance;
    const fuelType=req.body.fuelType;
    const mileage= fuelType === "none" ? "none" : req.body.mileage;
    const co2emission=(distance/mileage);
    //res.render("home",{user:user,distance:distance,fuelType:fuelType,mileage:mileage,co2emission,});
    // console.log(distance);
    // console.log(mileage);
    // console.log(fuelType);
    console.log(co2emission);

})

app.listen(port, () => {
    console.log(`server running on port :${port}`);
})