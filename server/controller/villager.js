const Villager = require('../models/villagerSchema');

exports.addRecord = (req, res) => {
    const name = req.body.name;
    UID = req.body.UID;
    email=req.body.email;
    Villager.findOne({ UID: req.body.UID })
        .then(data => {
            if (data) {
                return res.status(400).json({
                    error: "Adhar Number Already exists!"
                })
            } else {
                const data = new Villager({
                    name,
                    UID,
                    email
                });
                data.save((err,data)=>{
                    if(data){
                        return res.status(200).json({
                            message: "Villager Record Added!"
                        })
                    }
                })
            }
        })
        
}

exports.deleteRecord = (req, res) => {
    Villager.deleteOne({ UID: req.body.UID })
        .then(data => {
            return res.status(200).json({
                message: "villager record deleted!"
            })
        })
}


