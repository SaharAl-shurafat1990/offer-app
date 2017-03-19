 angular.module('addOffer',['geolocation','offers.services'])

.controller('addOfferContr',function ($scope,Offer,$location,$window,geolocation,gservice){
	$scope.data={};
    var coords = {};
    var lat = 0;
    var long = 0;

    $scope.data.latitude = 30.5852;
    $scope.data.longitude = 36.2384;

    gservice.refresh($scope.data.latitude, $scope.data.longitude);

  if(window.localStorage.getItem('userId')){
     var userID = window.localStorage.getItem('userId');
     $scope.data.userId=userID;
   }

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
      console.log($scope.data);
      var userData = {
             description: $scope.data.description,
              date: $scope.data.date,
              img:$scope.data.img,
            location: [$scope.data.longitude, $scope.data.latitude],
            htmlverified: $scope.data.htmlverified
        };

     setTimeout(function(){

  Offer.insert(userData)
  $location.path('/profile')
    .then(function (offer) {
        console.log(offer)

        console.log($scope.data)
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
      console.log(data)
     return $scope.all = data;
       console.log(data)
    })
    .catch(function (error) {
        console.log(error);
      });
  }

});
