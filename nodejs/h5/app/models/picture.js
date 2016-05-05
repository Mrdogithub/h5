var mongoose = require('mongoose');
var PictureSchema = require('../schemas/picture');
var Picture = mongoose.model('image', PictureSchema); // 通过mongoose.model来发布comment模型

module.exports = Picture;