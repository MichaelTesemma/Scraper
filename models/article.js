const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Articles', articleSchema)