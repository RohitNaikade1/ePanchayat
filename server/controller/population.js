const Record = require('../models/populationSchema');

exports.addRecord = (req, res) => {
    const years = req.body.years;
    console.log(req.body);
    const ID = req.body.ID;
    const menCount = req.body.menCount;
    const womenCount = req.body.womenCount;
    const childrenCount = req.body.childrenCount;
    Record.updateOne({ID:req.body.ID},
        {$set:{
            years:years,
            menCount:menCount,
            womenCount:womenCount,
            childrenCount:childrenCount
        }}
        ,function(err,result){
            return res.status(200).json({
                message: "Successful"
            });
        }
        )
    // const data = new Record({
    //     ID,
    //     years,
    //     menCount,
    //     womenCount,
    //     childrenCount
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

exports.fetchRecord = (req, res) => {
    Record.find({})
        .exec((err, data) => {
            if (err) return res.status(400).json({ err });
            if (data) {
                console.log(data);
                res.status(200).json({
                    data: data
                })
            }
        }
        )
}


