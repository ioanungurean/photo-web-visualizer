angular
.module('app')
.controller("GalleryCtrl", ['imageService', 'angularGridInstance', GalleryCtrl]);

function GalleryCtrl(imageService, angularGridInstance) {
  var vm  = this;

  vm.angularGridOptions = {
     gridWidth : 250,
     gutterSize : 10,
     refreshOnImgLoad : true
  }
 
  // imageService.fetchPopular(function(data){
  //   vm.pics = data;
  // });

  vm.refresh = function(){
    angularGridInstance.gallery.refresh();
  }

  vm.timeConverter = function (UNIX_timestamp){
    if(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    } else {return "unknown";}
  }
};