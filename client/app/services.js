
angular.module('offers.services', [])
.factory('comAuth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/companies/signin',
      data: user
    })
    .then(function (resp) {
      //console.log(user)
      return resp.data;
    });
  };
  var checkcode = function(code){
    return $http({
      method: 'GET',
      url:'/api/companies/checkcode/' + code.code,
    })
    .then(function(resp){
      return resp.data
    })
  }

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/companies/signup',
      data: user
    })
    .then(function (resp) {

      return resp.data;
    });
  };

  var signout = function () {
    $window.localStorage.removeItem('com.offer');
    $window.localStorage.removeItem('user.offer');
    $window.localStorage.removeItem('userId');

    $location.path('/signin');
    $window.location.reload();
  };


  return {
    signin: signin,
    signup: signup,
    signout: signout,
    checkcode:checkcode
  };
})
.factory('Comments',function ($http, $location, $window) {
  var insert = function (Comment) {
  var newComment = {text:Comment,
    offerId:window.localStorage._id}
    return $http({
      method : 'POST',
      url : '/api/insertC',
      data : newComment
    }).then(function (resp) {
      return resp.data
    })
  }

  var getAll = function (id) {
    // var id = window.localStorage._id
    return $http({
      method : 'POST',
      url : '/api/allC/' + id
    }).then(function (resp) {
      return resp.data
    })
  }

  return {
    insert : insert,
    getAll : getAll
  }
})

.factory('Offer',function ($http, $location) {

  var insert = function (offer) {
    return $http({
      method : 'POST',
      url : '/api/offers/addoffer',
      data : offer
    }).then(function (resp) {
      console.log(offer)
      console.log(resp.data)
      return resp.data
    })
  }

  var getAll = function () {
    return $http({
      method : 'GET',
      url : '/api/offers/'
    }).then(function (resp) {

      return resp.data
    })
  }


  var deleteOffer=function (deleteid) {
     return $http({
      method : 'POST',
      url : '/api/delete',
      data : deleteid
    }).then(function (resp) {
      return resp.data
    })
  }
  return {
    insert : insert,
    getAll : getAll,
    deleteOffer:deleteOffer

  }
})

.factory('gservice', function($http,$rootScope){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

       // Handling Clicks and location selection
       googleMapService.clickLat  = 0;
       googleMapService.clickLong = 0;

        // Array of locations obtained from API calls
        var locations = [];

        // Selected Location (initialize to center of jordan)
        var selectedLat = 30.5852;
        var selectedLong = 36.2384;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude){

            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/api/offers/').success(function(response){
              console.log(response)

                // Convert the results into Google Map Format
                locations = convertToMapPoints(response);

                // Then initialize the map.
                initialize(latitude, longitude);
            }).error(function(){});
        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function(response){

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];

                // Create popup windows for each record
                var  contentString =
                    '<p style="color:black"><b>description</b>: ' + user.description +
                    '<br><b>date</b>: ' + user.date +
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    description: user.description,
                    date: user.date
            });
        }
        // location is now an array populated with records in Google Maps format
        return locations;
    };

// Initializes the map
var initialize = function(latitude, longitude) {

    // Uses the selected lat, long as starting point
    var myLatLng = {lat: 41, lng: selectedLong};

    // If map has not been created already...
    if (!map){

        // Create a new map and place in the index.html page
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: myLatLng
        });
    }

    // Loop through each location in the array and place a marker
    locations.forEach(function(n, i){
        var marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: "Big Map",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    // Set initial location as a bouncing red marker
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: initialLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = marker;

    // Function for moving to a selected location
map.panTo(new google.maps.LatLng(latitude, longitude));

// Clicking on the Map moves the bouncing red marker
google.maps.event.addListener(map, 'click', function(e){
    var marker = new google.maps.Marker({
        position: e.latLng,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    // When a new spot is selected, delete the old red bouncing marker
    if(lastMarker){
        lastMarker.setMap(null);
    }

    // Create a new red bouncing marker and move to it
    lastMarker = marker;
    map.panTo(marker.position);
    
    // Update Broadcasted Variable (lets the panels know to change their lat, long values)
googleMapService.clickLat = marker.getPosition().lat();
googleMapService.clickLong = marker.getPosition().lng();
$rootScope.$broadcast("clicked");
});

};

// Refresh the page upon window load. Use the initial latitude and longitude
google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));

return googleMapService;
})


.factory('datetime', ['$timeout', function ($timeout) {

    var duration = function (timeSpan) {
        var days = Math.floor(timeSpan / 86400000);
        var diff = timeSpan - days * 86400000;
        var hours = Math.floor(diff / 3600000);
        diff = diff - hours * 3600000;
        var minutes = Math.floor(diff / 60000);
        diff = diff - minutes * 60000;
        var secs = Math.floor(diff / 1000);
        return { 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': secs };
    };
    function getRemainigTime(referenceTime) {
        var now = moment().utc();
        return moment(referenceTime) - now;
    }
    return {
        duration: duration,
        getRemainigTime: getRemainigTime
    };
}])



