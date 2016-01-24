angular.module('session',[]).service('Session',function(){
	this.create = function(userName){
//		this.id = sessionId;
		this.userName = userName;
//		this.userRole = userRole;
	}
	this.destroy = function(){
		this.id = null;
		this.userId = null;
		this.userRole = null;
	}
	return this;
});
