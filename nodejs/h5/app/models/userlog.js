var mongoose = require('mongoose');
var UserlogSchema = require('../schemas/userlog');
var Userlog = mongoose.model('userlog', UserlogSchema);

module.exports = Userlog;