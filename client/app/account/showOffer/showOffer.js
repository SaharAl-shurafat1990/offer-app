
angular.module('showOffer',[])

.controller('showfferContr',function ($scope,Offer,$location,$timeout,datetime, moment){
  $scope.all={};
  $scope.getAllOffers = function(){
    var today = moment();
    Offer.getAll()
    .then(function (data) {
      data = data.map((elem) => {
        var date = moment(elem.create_date);
        date = date.add(7,'d');
        elem.create_date = date.diff(today).valueOf() / 1000;
        return elem;
      });
     return $scope.all = data;

    })
    .catch(function (error) {
        console.log(error);
      });
  }

    // var tick = function () {
    //     $scope.currentTime = moment();
    //     processAuctionItems($scope.all);
    //     $timeout(tick, 1000);
    // }
    // var processAuctionItems = function (data) {
    //     angular.forEach(data, function (item) {
    //         item.remainingTime = datetime.getRemainigTime(item.AuctionEndDateTime);
    //     });
    // }
    // $scope.currentTime = moment();
    // // getAuctionItems();
    // $timeout(tick, 1000);
    // // $timeout(getAuctionItems, 10000);
    $scope.showCount = function(){
      var _second = 1000;
      var _minute = _second * 60;
      var _hour = _minute * 60;
      var _day = _hour * 24;

      function showRemaining() {
          var now = new Date();
          var distance = Date.parse($scope.all.create_date) - Date.parse(now);
          if (distance < 0) {
              clearInterval($scope.timer);
              $scope.countdown = 'EXPIRED!';
              $scope.showCount = false;
              return;
          }
          else{
            $scope.showCount = true;
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);
            $scope.days = days;
            $scope.hours = hours;
            $scope.minutes = minutes;
            $scope.seconds = seconds;
          }
      }
      $scope.timer = $interval(showRemaining, 1000);    
  }
})