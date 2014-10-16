var app = angular.module('myApp', ['ngRoute', 'firebase']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/partials/appForm.html',
		controller: 'authCtrl'
	})
	.when('/appForm', {
		templateUrl: '/partials/appForm.html',
		controller: 'authCtrl'
	})
	.when('/appReview/:userId', {
		templateUrl: '/partials/appReview.html',
		controller: 'appStatusCtrl',
		resolve: {
			userReference: function(firebaseFactory, $route){
				return firebaseFactory.getUser($route.current.params.userId);
			}
		}
	})
	.when('/appStatus/:userId', {
		templateUrl: '/partials/appStatus.html',
		controller: 'appStatusCtrl',
		resolve: {
			userReference: function(firebaseFactory, $route){
				return firebaseFactory.getUser($route.current.params.userId);
			}
		}
	})
	.when('/statusLogin', {
		templateUrl: '/partials/statusLogin.html',
		controller: 'authCtrl'
	})
	.when('/passwordreset', {
		templateUrl: '/partials/passwordreset.html',
		controller: 'appStatusCtrl',
		resolve: {
			userReference: function(firebaseFactory, $route){
				return firebaseFactory.getUser($route.current.params.userId);
			}
		}
	})
	.when('/404', {
		templateUrl: '/partials/page404.html',
	})
	.otherwise({
		redirectTo: '/404'
	})

});