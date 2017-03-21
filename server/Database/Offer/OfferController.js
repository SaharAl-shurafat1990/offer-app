var Offer = require('./OfferModel.js')
module.exports.handleOffers={
  getAll: function(req,res){
    Offer.find().exec(function(err,allOffers) {
      if(err){
        res.status(500).send(err)
      }else{

        res.json(allOffers)
      }
    })
  },

  addOffer:function(req,res){
    // console.log(req.body)
    var companyName = req.body.companyName
    var location=req.body.location;
    var description=req.body.description;
    var date=req.body.date;
    var img=req.body.img;
    var id=req.body.userId;

    Offer.create({
    companyName:companyName,
    location:location,
    description:description,
    date:date,
    img:img,
    c_id:id

    },function(err,ok){
      if(err){
        res.json(err);
      }
      else{
        console.log(ok)
        res.json("add succsees full!!")
      }

    })
  },

deleteOffer:function(req,res){
  var id=req.body.id;
  // console.log(id);
    Offer.remove({_id:id},function(err,ok){
    if(err){
      res.json(err)
    }
    else{
      res.json(ok)
    }
  })
}
}
