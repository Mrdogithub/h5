var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var FormSchema = new Schema({
	project_id : {type: ObjectId, ref: 'Project'},
	value : Schema.Types.Mixed,
	inserttime : {type: Date, default: Date.now()}
},{
	versionKey: false
});

FormSchema.pre('save', function(next){
	this.inserttime = Date.now();
	next();
});

FormSchema.statics = {
	findByProject: function(pid, cb){
		this.find({project_id: pid}).sort({'inserttime': 'desc'}).exec(cb);
	}
}

module.exports = FormSchema;

