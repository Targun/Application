var app = angular.module('myApp');

app.service('authService', function($location){
	//This is a reference to the firebase endpoint
	var firebaseUrl = 'https://theapplication.firebaseio.com/';
	//Creates an object using the Firebase Constructor with our endpoint in
	var firebaseLogin = new Firebase(firebaseUrl);

	//Login method to be called from our controller.  The callback is then passed the authenticated user
	this.login = function(user, callback){
		firebaseLogin.authWithPassword({
			email    : user.email,    //Email and Password come from our login form 
			password : user.password
		}, function(err, authData){
			if (err) {
				switch(err.code){
					case "INVALID EMAIL":
					//handle an invalid email
					case "INVALID PASSWORD":
					//handle an invalid password
					default:
				}
			} else if (authData){
				// user authenticated with Firebase
				console.log("Logged In! User ID: " + authData.uid);
				callback(authData);//gives the authenticated user to our callback
			}
		});
	}

	this.register = function(user, callback){
		firebaseLogin.createUser({
			email: user.email,
			password: user.password
		}, function(error){
			if (error === null) {
				console.log("User Created Successfully");
				//This automatically logs the user into their account
				firebaseLogin.authWithPassword({
					email: user.email,
					password: user.password
				}, function(err, authData){
					if (authData){
						authData.companyName = user.companyName;
						authData.firstName = user.firstName;
						authData.lastName = user.lastName;
						authData.contactPosition = user.contactPosition;
						authData.email = user.email;
						authData.password = user.password;
						authData.contactPhone = user.contactPhone;
						// authData.phoneExt = user.phoneExt;
						authData.zip = user.zip;
						authData.city = user.city;
						authData.state = user.state;
						authData.industryBucket = user.industryBucket;
						authData.businessDeiscription = user.businessDeiscription;
						authData.timestamp = new Date().toISOString();

						firebaseLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
						callback(authData);
					} else {
						console.log('Something Went Wrong')
					}
				});
			} else {
				console.log("Error Creating User:", error);
				return false;
			}
		})
	}

	this.forgotPass = function(user, callback) {
		firebaseLogin.resetPassword({
			email: user.email
		}, function(err) {
  			if (err) {
    			switch (err.code) {
      				case 'INVALID_USER':
        			console.log("Sorry, this account does not exist");
      				default:
      			}
    		} else {
    			console.log("Password reset was sent successfully");
    			callback();
  			}
		});
	}

});



