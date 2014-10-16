var app = angular.module('myApp');

app.factory('firebaseFactory', function($firebase){

	var firebaseUrl = 'https://theapplication.firebaseio.com/';

	var fireUser = {
		getUser: function(userId){
			return $firebase(new Firebase(firebaseUrl + 'users/' + userId)).$asObject().$loaded();
			//The $loaded() waits for this to be loaded until it runs any code after it
			//.$asObject() returns the user as an object
		}
	}

	return fireUser;

});
