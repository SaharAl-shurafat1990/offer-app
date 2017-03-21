angular.module('showOffer',[])

.controller('showfferContr',function ($scope,Offer,$location){
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
})