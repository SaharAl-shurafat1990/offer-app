 angular.module('addOffer',['geolocation','offers.services'])

.controller('addOfferContr',function ($scope,Offer,$location,$window,geolocation,gservice,$rootScope){
	$scope.data={};
    var coords = {};
    var lat = 0;
    var long = 0;

    $scope.data.latitude = 30.5852;
    $scope.data.longitude = 36.2384;


// Get User's actual coordinates based on HTML5 at window load
geolocation.getLocation().then(function(data){

    // Set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};

    // Display coordinates in location textboxes rounded to three decimal points
    $scope.data.longitude = parseFloat(coords.long).toFixed(3);
    $scope.data.latitude = parseFloat(coords.lat).toFixed(3);

    // Display message confirming that the coordinates verified.
    $scope.data.htmlverified = "Yep (Thanks for giving us real data!)";

    gservice.refresh($scope.data.latitude, $scope.data.longitude);

});

    gservice.refresh($scope.data.latitude, $scope.data.longitude);

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

  // Get coordinates based on mouse click. When a click event is detected....
$rootScope.$on("clicked", function(){

    // Run the gservice functions associated with identifying coordinates
    $scope.$apply(function(){
        $scope.data.latitude = parseFloat(gservice.clickLat).toFixed(3);
        $scope.data.longitude = parseFloat(gservice.clickLong).toFixed(3);
        $scope.data.htmlverified = "Nope (Thanks for spamming my map...)";
    });
});

	  $scope.addOffer = function () {

      console.log($scope.data);
      var userData = {
             description: $scope.data.description,
              date: $scope.data.date,
              img:$scope.data.img,
              userId:$scope.data.userId,
            location: [$scope.data.longitude, $scope.data.latitude],
            htmlverified: $scope.data.htmlverified
        };



     setTimeout(function(){

  Offer.insert(userData)
  $location.path('/profile')
    .then(function (offer) {
      })
      .catch(function (error) {
      });

      }, 1000);

  }
  // $scope.all={};
  // $scope.getAllOffers = function(){
  //   Offer.getAll()
  //   .then(function (data) {

  //    return $scope.all = data;

  //   })
  //   .catch(function (error) {
  //       console.log(error);
  //     });
  // }

});
