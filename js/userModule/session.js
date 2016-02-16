angular.module('session',[]).service('Session',function(){
	this.create = function(userName,userPhoto){
//		this.id = sessionId;
		this.userName 	= userName;
		this.userPhoto  = userPhoto;
//		this.userRole = userRole;
	}
	this.destroy = function(){
		// this.id = null;
		this.userName 	= null;
		this.userPhoto 	= null;
		// this.userRole = null;
	}
	return this;
});
