const Record = require('../models/currCommitteeSchema.js');

exports.addData = (req, res) => {

    const Name = req.body.Name;
    const ID = req.body.ID;

    const designation = req.body.designation;
    const contact = req.body.contact;
    Record.updateOne({ID:req.body.ID},
        {$set:{
            Name:Name,
            designation:designation,
            contact:contact
        }}
        ,function(err,result){
            return res.status(400).json({
                message: result
            });
        }
        )
    // const data = new Record({
    //     ID,
    //     Name,
    //     designation,
    //     contact
    // });
    // data.save((error, data) => {
    //     if (error) {
    //         return res.status(400).json({
    //             message: error
    //         });
    //     }
    //     if (data) {
    //         return res.status(201).json({
    //             data: data
    //         });
    //     }
    // })
}

exports.readData = (req, res) => {
    Record.find({})
        .exec((err, data) => {
            if (err) return res.status(400).json({ err });
            if (data) {
                res.status(200).json({
                    data: data
                })
            }
        }
        )
}


