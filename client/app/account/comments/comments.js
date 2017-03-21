angular.module('offers.comments', ['ngMaterial'])

.controller('commentsController', function($scope, $mdDialog , Comments, $mdMedia, $window) {
  $scope.com = {};
  $scope.comment = ''
  $scope.addComment= function (commentValue) {
     $scope.comment = commentValue
    Comments.insert($scope.comment)
      .then(function () {
        console.log($scope.comment, ' we are here in front-end to let fatima see what is happing')

       initializeComments()
      })
      .catch(function (error) {
        console.log(error);
      });
  };




  var initializeComments = function () {
    Comments.getAll(window.localStorage._id)
      .then(function (data) {
        $scope.com = data;
        // console.log( $scope.com, " comment")
      })
  };
$scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showPrerenderedDialogComment = function(ev ,offer) {
    console.log(offer)
    // window.localStorage.removeItem("_id")
    // console.log($scope.com,"we are here in the popup")
    $scope.offerid = offer._id ;
     $window.localStorage._id = $scope.offerid
    console.log(window.localStorage._id, " comments")
    $mdDialog.show({
      contentElement: '#comments',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };
    initializeComments()

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }


});
