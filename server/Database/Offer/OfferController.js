var Offer = require('./OfferModel.js')

module.exports = {
  addOffer: function(req,res){

    // console.log(req.body)


      var newOffer = new Offer({
        description : req.body.description,
        location : req.body.location,

        date : req.body.date,
        img: req.body.img

      })
      Offer.create(newOffer, function (err, newOffer) {
        if (err) {
          // console.log(err, "HELLO")
          res.status(500).send(err);
        }else{
          res.status(201).json(newOffer);
        }
      })
  },


  getOffer : function (req, res) {
    Offer.find({_id : req.params.id}).exec(function (err, offer) {
      if (err) {
        res.status(500).send(err);
      }else{
        res.json(offer);
      }
    })
  },

  getAll: function(req,res){
    Offer.find().exec(function(err,allOffers) {
      if(err){
        res.status(500).send(err)
      }else{

        res.json(allOffers)
      }
    })
  },
  updateOffer:function(req,res){
        Offer.findById(req.user._id,function (error, offer) {

	 			if(!offer){
	 				console.log("xxxxx")
	 				res.status(500).send(error);
	 			}else{
	 		    Offer.update({id:req.body._id},req.body,function(err,newoffer){

	 			   if(err){
				      res.status(500).send('err');
			        }else{
				     res.status(200).send(newoffer);
			       }

               })
	 	    }
	    })
	},
  deleteOffer:function(req,res){
      Offer.remove({_id:req.body.id},function(err,ok){
        if(err){
            res.status(500).send('err');
        }else{
           res.status(200).send('deleted');
        }
      })
  }

}
