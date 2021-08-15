const mongoose=require("mongoose");
const villagerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    UID:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    }
},{
    timestamps:true
});

module.exports=mongoose.model('villager',villagerSchema);
