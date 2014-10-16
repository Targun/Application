var app = angular.module('myApp');

app.controller('appStatusCtrl', function ($scope, userReference, $location) {

	$scope.callPend = true;
	$scope.appProfile = userReference;

	console.log($scope.appProfile.industryBucket);


	
});