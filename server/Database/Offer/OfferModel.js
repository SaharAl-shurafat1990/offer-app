var mongoose = require('mongoose')


var OfferSchema = new mongoose.Schema({
    description:{
      type: String,
      required: true
    },
    // location:{
    //   type:String,
    //   required: true
    // },
    date:{

      type : String,
      required : true
    },
    c_id:String,
     img:String,

    location: {
    type: [Number],
    required: true
    }, // [Long, Lat]
    htmlverified: String

      })

  
  OfferSchema.index({location: '2dsphere'});
  module.exports = mongoose.model('Offer', OfferSchema)
