angular
.module('app')
.controller("MapCtrl", ['imageService', MapCtrl]);

function MapCtrl(imageService, NgMap) {
	var vm = this;

	// vm.toggleBounce = function() {
 //      if (this.getAnimation() != null) {
 //        this.setAnimation(null);
 //      } else {
 //        this.setAnimation(google.maps.Animation.BOUNCE);
 //      }
 //    };

  var onLocationFound = function(data) {
  	vm.locations = data;
  	console.log(vm.locations);
  	//for each location get photos
  	//imageService.getPhotos(vm.locations).then(onPhotos, onError);
  };

  var onPhotos = function(data) {
		//aici trebuie sa trimit la gallery controller
		vm.pics = data;
	}

	var onError = function(response) {
		console.log("Error at $http GET request!");
	};

	vm.getPhotos = function(lat, lng) {
		imageService.getLocations(lat, lng).then(onLocationFound, onError);
	};
};