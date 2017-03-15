var mongoose = require('mongoose')


var OfferSchema = new mongoose.Schema({
    description:{
      type: String,
      required: true
    },
    location:{
      type:String,
      required: true
    },
    date:{

      type : String,
      required : true
    },
     img:String

    
      })

  module.exports = mongoose.model('Offer', OfferSchema)
