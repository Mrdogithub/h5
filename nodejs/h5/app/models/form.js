var mongoose = require('mongoose');
var FormSchema = require('../schemas/form');
var UserForm = mongoose.model('form', FormSchema); // 通过mongoose.model来发布comment模型

module.exports = UserForm;