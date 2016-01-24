angular
.module('app')
.controller('MainCtrl', ['$mdSidenav', '$mdToast', MainCtrl]);

function MainCtrl($mdSidenav, $mdToast, NgMap) {

	var vm  = this;
	vm.tags = [];
	vm.positions = [];

	vm.toggleSidenav = function(menu) {
		$mdSidenav(menu).toggle();
	};

	vm.toast = function(message) {
		var toast = $mdToast.simple().content('You clicked ' + message).position('bottom right');
		$mdToast.show(toast);
	};

	vm.toggle = function(item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) list.splice(idx, 1);
		else list.push(item);
	};

	vm.changeTheme = function(theme) {
		vm.theme = theme;
		$mdToast.show(
			$mdToast.simple()
			.content('Your theme is now ' + theme)
			.position('bottom right')
		);
		localStorage.setItem('theme', theme);
	}

	//------- Initialize starting display position of the map -------
  vm.addMarker = function(event) {
    var ll = event.latLng;
    vm.positions.push({pos:[ll.lat(), ll.lng()]});
  }

  vm.clearMarkers = function(event) {
    vm.positions = [];
  }

};