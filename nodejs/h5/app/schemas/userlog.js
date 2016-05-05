var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserlogSchema = new Schema({
	user_id: String,
	ip: String,
	accesstime: {type: Date, default: Date.now()},
	page: String,
	project_id : {type: ObjectId, ref: 'Project'}
},{
	versionKey: false
});

UserlogSchema.statics = {
	findUserlogByProject: function(pid, cb){
		this.find({project_id: pid}).sort({'accesstime': 'desc'}).exec(cb);
	}
}

module.exports = UserlogSchema;