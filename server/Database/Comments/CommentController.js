var Comment = require ('./CommentModel');

module.exports = {

	insert : function (req, res) {
		// Comment.findOne({OfferId : req.body.offerId})
			// .exec(function (error, offer) {
		// 		console.log(req.body.offerId)
		console.log(req.body, 'we are here to see what inside the body ')
				var newComment = new Comment ({
					text: req.body.text,
		       OfferId : req.body.offerId
				});
			newComment.save(function(err, newComment){
				console.log(newComment, ' new commnet')
	    		if(err){
	       		 	res.status(500).send(err);
	    		}else{
	    			res.json(newComment)
	    		};
			});
		// })
	},

	getAllCommentsByOfferID : function (req, res) {
		console.log(req.params.id);
		Comment.find({OfferId:req.params.id}).exec(function (err, allComment) {
			if(err){
				res.status(500).send('err');
			}else{
				// console.log(allComment)
				res.status(200).send(allComment);
			}
		});
	}
}
