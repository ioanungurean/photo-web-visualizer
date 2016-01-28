angular
.module('app')
.controller("MapCtrl", ['imageService', 'galleryService', MapCtrl]);

function MapCtrl(imageService, galleryService, NgMap) {
	var vm = this;

	vm.pics = [];
  vm.photoPos = [];
  vm.photoList = [];

  console.log(vm.photoPos);

  var onLocationFound = function(data) {
  	vm.loc = data.data;
  	angular.forEach(vm.loc, function(loc) {
  		imageService.getPhotos(loc.id).then(onPhotos, onError); 
  	}); 	
  };	

  var onPhotos = function(data) {
  	if (typeof data.data !== 'undefined' && data.data.length > 0) {
  		angular.forEach(data.data, function(photo) {
  			galleryService.addPhoto(photo);
        vm.photoList.push(photo);
  			var ok = 0;
  			for (var i = 0; i < vm.photoPos.length; i++) {
						if(photo.location.longitude === vm.photoPos[i].location.longitude && photo.location.latitude === vm.photoPos[i].location.latitude){
  						ok = 1;
						}
  			};
  			if(ok === 0)
  				vm.photoPos.push(photo);
  		});

  	};
	}

	var onError = function(response) {
		console.log("Error at $http GET request!");
	};

	vm.getPhotos = function(lat, lng) {
		galleryService.deleteAllPhotos();
		imageService.getLocations(lat, lng).then(onLocationFound, onError);
	};

  vm.saveToLS = function() {
    localStorage.setItem('photoPos', JSON.stringify(vm.photoPos));
    localStorage.setItem('photoList', JSON.stringify(vm.photoList));
  }

  vm.getFromLS = function() {
    if(localStorage.getItem("photoPos") !== null) 
      vm.photoPos = JSON.parse(localStorage.getItem("photoPos"));

    if(localStorage.getItem("photoList") !== null) 
      galleryService.copyPhotos(JSON.parse(localStorage.getItem("photoList")));
  }
};