const mongoose=require('mongoose');
const populationSchema=new mongoose.Schema({
    ID:{
        type:Number
    },
    years:{
        type:[String],
        required:true,
        max:5,
        min:5
    },
    menCount:{
        type:[Number],
        required:true,
        max:5,
        min:5
    },
    womenCount:{
        type:[Number],
        required:true,
        max:5,
        min:5
    },
    childrenCount:{
        type:[Number],
        required:true,
        max:5,
        min:5
    },
},{
    timestamps:true
});

module.exports=mongoose.model('population',populationSchema);