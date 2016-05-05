var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var ProjectSchema = new Schema({
	projectname : String,
	projectInfo : String,
	owner : String,
	createtime : {type: Date, default: Date.now()},
	lastmodify : {type: Date, default: Date.now()},
	pages : Schema.Types.Mixed,
	pageLength : Schema.Types.Mixed,
	url : String,
	qrcode : String,
	cover: String,
	form: [Schema.Types.Mixed]
},{
	versionKey: false
});

ProjectSchema.virtual('createtimeStr').get(function(){
	return moment(this.createtime).format('YYYY-MM-DD HH:mm');
});
ProjectSchema.virtual('lastmodifyStr').get(function(){
	return moment(this.lastmodify).format('YYYY-MM-DD HH:mm');
});

ProjectSchema.pre('save', function(next){
	// if(this.isNew){
		this.createtime = this.lastmodify = Date.now();
	// }else{
	// 	this.lastmodify = Date.now();
	// }
	next();
});

ProjectSchema.pre('update', function(next){
	this.lastmodify = Date.now();
	next();
})

ProjectSchema.statics = {
	findByOwner : function(uid, cb){
		this.find({owner: uid}).sort({'lastmodify': 'desc'}).exec(cb);
	},
	findById : function(id, cb){
		this.findOne({_id: id}).exec(cb);
	}
}

module.exports = ProjectSchema;