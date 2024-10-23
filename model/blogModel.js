const mongoose = require('mongoose');

const blogschema = new mongoose.Schema({

userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
title:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
}

})

module.exports = mongoose.model('Blog',blogschema)