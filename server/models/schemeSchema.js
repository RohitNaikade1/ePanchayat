const mongoose=require('mongoose');
const schemeSchema=new mongoose.Schema({
    schemeId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    weblink:{
        type:String,
        required:true,
        lowercase:true
    },
    department:{
        type:String,
        required:true
    },
    picture:{
        type:String
    }
},{
    timestamps:true
});

module.exports=mongoose.model('Scheme',schemeSchema);