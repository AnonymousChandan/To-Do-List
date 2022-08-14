const express = require("express")
const mogoose = require("mongoose")
const userModel = require("./userSchema")
const dotenv=require("dotenv").config()
const activityModel=require("./dataModel")
const { checkExistingUser, generatePasswordHash } = require("./utility")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const secret_key=crypto.randomBytes(64).toString("hex")
const app = express()
app.listen(3006, (err) => {
    if (!err) {
        console.log("Server connected")
    } else {
        console.log(err)
    }
})
mogoose.connect("mongodb://localhost/newUser", (err) => {
    if (!err) {
        console.log("database connected")
    } else {
        console.log(err)
    }
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.post("/login", (req, res) => {
    userModel.find({ username: req.body.username }).then((userData) => {
        if (userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val) => {
                if (val) {
                    const authToken = jwt.sign(userData[0].username,process.env.secret_key);
                    res.status(200).send({ authToken });
                } else {
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            res.status(400).send("Unauthorized user");
        }
    })
});

app.post("/register", async (req, res) => {
    if (await checkExistingUser(req.body.username)) {
        res.status(400).send("Username exist. Please try with different username");
    } else {
            generatePasswordHash(req.body.password).then((passwordHash) => {
                userModel.create({ username:req.body.username, password: passwordHash,confirmpassword:passwordHash}).then((data) => {
                    res.status(200).send("User created Successfully")
                }).catch((err) => {
                    res.status(400).send(err.message)
                })
            });
        }
        
});
app.get("/details",(req,res)=>{
    const username=jwt.verify(req.headers.authorization,process.env.secret_key)
    userModel.find({username:username}).then((data)=>{
        res.status(200).send(data[0])
    })
})
app.post("/logout", (req, res)=> {
    res.status(200).send("logout works");
});
app.post("/add",(req,res)=>{
    const user= jwt.verify(req.headers.authorization,process.env.secret_key)
     console.log(req.body)
     console.log(req.headers.authorization)
     activityModel.create({
         username:user,
         Activity:req.body.Activity,
         Status:"Pending",
         timetaken:""
     }).then((data)=>{
         res.status(200).send("todo Created Successfully")
     }).catch((err)=>{
         res.status(400).send(err.message)
     })
 })
 app.get("/all",(req,res)=>{
     const user=jwt.verify(req.headers.authorization, process.env.secret_key)
         activityModel.find({username:user}).then((data)=>{
             res.status(200).send(data)
         })
     })
 
 app.post("/updatetask",(req,res)=>{
     
     activityModel.updateOne({_id:req.body._id},{ $set:{timetaken:req.body.timetaken}}).then(()=>{
         activityModel.updateOne({_id:req.body._id},{ $set:{Status:"Completed"}}).then(()=>{
             res.status(200).send("Changed Successfully")
         }).catch((err)=>{
             res.status(400).send(err)
         })
     })
 })