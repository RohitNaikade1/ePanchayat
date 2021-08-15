const mongoose = require('mongoose');
const currCommitteeSchema = new mongoose.Schema({
    ID:{
        type:Number
    },
    Name: {
        type: [String]
    },
    designation: {
        type: [String]
    },
    contact: {
        type: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('currCommittee', currCommitteeSchema);