var mongoose= require ("mongoose");

var CommentSchema = new mongoose.Schema({

	text:{
		type     : String,
		required : false,

	},
    OfferId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }
});

var Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment ;
