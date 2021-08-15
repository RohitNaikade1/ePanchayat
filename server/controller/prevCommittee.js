const Record = require('../models/prevCommitteeSchema.js');

exports.addData = (req, res) => {
    const Name = req.body.Name;
    const ID = req.body.ID;
    const workingPeriod = req.body.workingPeriod;
    const Caste = req.body.Caste;
    const data = new Record({
        ID,
        Name,
        workingPeriod,
        Caste
    });
    Record.updateOne({ID:req.body.ID},
        {$set:{
            Name:Name,
            workingPeriod:workingPeriod,
            Caste:Caste
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
    //     workingPeriod,
    //     Caste
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


