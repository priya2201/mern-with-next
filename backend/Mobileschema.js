const mongoose = require('mongoose')
const mobileSchema = new mongoose.Schema({
    launchDate: { type: Date, required: true },
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    price: { type: Number, required: true },
    display: [{
        displayType: { type: String, required: true },
        displaySize: { type: String, required: true },
    
    }],
    cameras: [{
        front: { type: String, required: true },
        back: { type: String, required: true },
    
    }],
    others: [{
        chargingType: { type: String, required: true },
        sensors: { type: String, required: true },
        networkType: { type: String, required: true },
        waterResistant: { type: Boolean, required: true },
        androidVersion: { type: Number, required: true },
        warranty: { type: String, required: true },
       
    
    }],
    images: [{type: String}]

})

const Mobile = mongoose.model('Mobile', mobileSchema)
module.exports=Mobile