var app = angular.module("app")
.factory('imageService', ['$http', function($http){
	return {
		fetchPopular: function(callback){

			var endPoint = "https://api.instagram.com/v1/locations/514276/media/recent?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";

			$http.jsonp(endPoint).success(function(response){
			  callback(response.data);
			});
		}
	}
}]);
