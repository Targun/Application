var app = angular.module('myApp');

app.controller('authCtrl', function ($scope, authService, $location) {
	//
	//Industry Selector
	//
	$scope.parents = [];
	$scope.children = [];
	$scope.bucket = [];
	$scope.selectBoxes = true;

	var addParents = function(data){
		for(var i = 0; i < data.length; i++){
			$scope.parents.push(data[i]);
		}
	}
	addParents(industries);

	// $scope.showChildren = function(parentData){
	// 	$scope.children = [];
	// 	arr = parentData.children;
	// 	for(var i = 0; i < arr.length; i++){
	// 		$scope.children.push(arr[i]);
	// 	}
	// }

	$scope.showChildren = function(parentData){
		$scope.children = parentData.children;
	}

	$scope.addToBucket = function(childData){
		arr = $scope.children;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].name === childData.name){
				$scope.children.splice(i, 1);
			}
		}
		$scope.bucket.push(childData);
		if($scope.bucket.length > 2){
			$scope.selectBoxes = false;
		}
	}

	$scope.removeFromBucket = function(bucketData){
		arr = $scope.bucket;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].name === bucketData.name){
				$scope.children.unshift(arr[i]);
				$scope.bucket.splice(i, 1);
			}
		}
		if($scope.bucket.length < 3){
			$scope.selectBoxes = true;
		}
	}




	//
	//Login and Register
	//
	$scope.login = function(userData){
		return authService.login(userData, function(user){
			user.uid = user.uid.replace('simplelogin:', '');
			$scope.$apply(function(){
				$location.path('/appStatus/' + user.uid)
			});
		});
	};

	$scope.register = function(userData){
		//Create the Industry Bucket array
		userData.industryBucket = [];
		for(var i = 0; i < $scope.bucket.length; i++){
			userData.industryBucket.push($scope.bucket[i].name);
		}

		$scope.$broadcast('show-errors-check-validity');

		if ($scope.applicationForm.$invalid) {
			return; 
		}
		else if ($scope.applicationForm.$valid) {
			return authService.register(userData, function(user){
				user.uid = user.uid.replace('simplelogin:', '');
				$scope.$apply(function(){
					$location.path('/appReview/' + user.uid);
				})
			})
		}
	}

	$scope.forgotPassword = function(userData){
		return authService.forgotPass(userData, function(){
			$scope.$apply(function(){
				$location.path('/passwordreset')
			});
		});
	}

});