var mongoose = require('mongoose')


var OfferSchema = new mongoose.Schema({
    companyName:{
      type:String
    },
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
    c_id:String,
     img:String

      })

  module.exports = mongoose.model('Offer', OfferSchema)
