 angular.module('addOffer',[])

.controller('addOfferContr',function ($scope,Offer,$location,$window){
	$scope.data={};

  $scope.upload=function(element){
   var file=element[0];
   console.log(file)
    var reader = new FileReader();
   reader.addEventListener("load", function () {
    $scope.data.img = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
   
  }
	  $scope.addOffer = function () {
      console.log($scope.data)
     setTimeout(function(){

Offer.insert($scope.data)
    .then(function (serv) {
        console.log(serv)
        
        console.log($scope.data)
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });

      }, 1000);
  	
  }
  $scope.all={};
  $scope.getAllOffers = function(){
    Offer.getAll()
    .then(function (data) {
     return $scope.all = data;
      // console.log(data)
    })
    .catch(function (error) {
        console.log(error);
      });
  }

});