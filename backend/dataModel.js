const mongoose =require("mongoose")
const postSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    Activity:{
        type:String,
        required:true
    },
    Status:{
        type:String,
         required:true,
    },
    timetaken:{
        type:String
    }
})
const activityModal=mongoose.model("posts",postSchema)
module.exports=activityModal