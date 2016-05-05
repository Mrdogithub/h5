var mongoose = require('mongoose');
var moment = require('moment');

var PictureSchema = new mongoose.Schema({
	name : String,
	size : String,
	url : String,
	owner : String,
	date : {type: Date, default: Date.now()}
},{
	versionKey: false
});

PictureSchema.virtual('dateStr').get(function(){
	return moment(this.date).format('YYYY-MM-DD HH:mm');
});

PictureSchema.statics = {
	findByOwner : function(uid, cb){
		this.find({owner: uid}).sort({'date': 'desc'}).exec(cb);
	},
	findById : function(id, cb){
		this.findOne({_id: id}).exec(cb);
	}
}

module.exports = PictureSchema;