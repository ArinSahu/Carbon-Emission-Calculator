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
                res.render("home");
            }
            else {
                res.render("login", { message: "Wrong password" });
            }
        }
    } catch {
        res.send("Wrong details");
    }
});

app.listen(port, () => {
    console.log(`server running on port :${port}`);
})