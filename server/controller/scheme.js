const Scheme=require('../models/schemeSchema');
const key=require('../config/keys')

exports.add=(req,res)=>{
    const {
        title,
        description,
        weblink,
        department,
        picture
    }=req.body;
    const _scheme=new Scheme({
        title,
        description,
        weblink,
        department,
        picture,
        schemeId:Math.random().toString()
    });
    _scheme.save((error,data)=>{
           if(error){
               return res.status(400).json({
                   message:error
               });
           }
           if(data){
               return res.status(201).json({
                   message:"Scheme added successfully!"
               });
           }
    })
}

exports.view=(req,res)=>{
    Scheme.find({})
.exec((err,data)=>{
    if(err) return res.status(400).json({err});
    if(data){
            res.status(200).json({
                data
            })
    }
})
}

exports.deleteScheme=(req, res) => {
    const key = req.body.id;
    Scheme.deleteOne({ _id: key })
        .then((data,err) => {
            if(data){
                return res.status(200).json({
                    message: "Scheme deleted successfully!"
                })
            }else{
                return res.status(200).json({
                    message: err
                })
            }
            
        })
}


