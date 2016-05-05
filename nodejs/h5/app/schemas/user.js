var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
	username : String,
	password : String,
	email : String,
	photo : String
},{
	versionKey: false
});

UserSchema.statics = {
	findLoginUser: function(username, password, cb){
		this.findOne({username: username, password: password}).exec(cb);
	}
}

module.exports = UserSchema;

