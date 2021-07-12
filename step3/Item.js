const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    content: String,
    completed:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date
    }

})

const Item = mongoose.model('Item', itemSchema)

module.exports = { Item }
