angular.module('app.profile', [])

.controller('ProfileController', function ($scope, $location, $window , comAuth , Offer){
   $scope.data={};

   $scope.profile=[];
   if(window.localStorage.getItem('userId')){
     var userID = window.localStorage.getItem('userId');
     $scope.data.userId=userID;
   }



  $scope.getProfile = function(){
    //console.log($scope.data.userId)
    Offer.getAll()
    .then(function (data) {
    	for (var i = 0; i < data.length; i++) {
    		if(data[i]['c_id'] === $scope.data.userId){
      	 		 $scope.profile.push(data[i]);

    		}
    	}
      return $scope.profile
    })
    .catch(function (error) {
        console.log(error);
      });
  }

$scope.deleteid={};
$scope.Confirmdelete = function (id) {

     $scope.deleteid.id=id;

    Offer.deleteOffer($scope.deleteid);


        $window.location.reload();
      }
})
