 angular.module('addOffer',[])

.controller('addOfferContr',function ($scope,Offer,$location,$window){
	$scope.data={};
  if(window.localStorage.getItem('userId')){
     var userID = window.localStorage.getItem('userId');
     $scope.data.userId=userID;
   }

  $scope.upload=function(element){
   var file=element[0];
    var reader = new FileReader();
   reader.addEventListener("load", function () {
    $scope.data.img = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }

  }
	  $scope.addOffer = function () {
     setTimeout(function(){

  Offer.insert($scope.data)
  $location.path('/profile')
    .then(function (offer) {

      })
      .catch(function (error) {
      });

      }, 1000);

  }
  $scope.all={};
  $scope.getAllOffers = function(){
    Offer.getAll()
    .then(function (data) {
     return $scope.all = data;
    })
    .catch(function (error) {
        console.log(error);
      });
  }

});
