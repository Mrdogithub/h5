var log4js = require('log4js');

log4js.configure({
	appenders: [
		{type: 'console'}, 
		{
			type: 'dateFile',
			filename: 'logs/h5.log',
			pattern: '_yyyy-MM-dd',
			maxLogSize: 1024,
			alwaysIncludePattern: false,
			backups: 4,
			category: 'logger'
		}
	],
	replaceConsole: true,
	levels: {
		'logger': 'ALL'
	}
});

exports.logger = function(name){
	var logger = log4js.getLogger(name);
	// logger.setLevel('INFO');
	return logger;
}

exports.use = function(app){
	app.use(log4js.connectLogger(this.logger('logger'), {level:'auto', format: ':method :url :status'}));
}