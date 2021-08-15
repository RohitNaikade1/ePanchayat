const mongoose = require('mongoose');
const prevCommitteeSchema = new mongoose.Schema({
    ID:{
        type:Number
    },
    Name: {
        type: [String]
    },
    workingPeriod: {
        type: [String]
    },
    Caste: {
        type: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('prevCommittee', prevCommitteeSchema);