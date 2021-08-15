const mongoose=require("mongoose");
const paymentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    forReason:{
        type:String,
        required:true
    },
    order_id:{
        type:String,
        required:true
    },
    payment_id:{
        type:String,
        trim:true
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    number:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports=mongoose.model('payment',paymentSchema);