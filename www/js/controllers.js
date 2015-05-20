var applications = [{
  id: 'kio',
  name: 'Kio',
  description: 'Application registry',
  url: 'http://localhost:8080'
}, {
  id: 'fullstop',
  name: 'Fullstop',
  description: 'Audit reporting',
  url: 'http://localhost:8080'
}, {
  id: 'pierone',
  name: 'Pierone',
  description: 'Docker registry',
  url: 'http://localhost:8080'
}];

applications = applications.sort(function(a, b) {

  var applicationA = a.name.toLowerCase();
  var applicationB = b.name.toLowerCase();

  if (applicationA > applicationB) return 1;
  if (applicationA < applicationB) return -1;
  return 0;
});

console.log(applications);

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PieroneTagsCtrl', function($scope, $http) {

  // Simple GET request example :
  $http.get(
      'http://localhost:8080/teams/stups/artifacts/fullstop/tags')
    .
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.pieroneTags = data;
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
})

.controller('FullstopViolationsCtrl', function($scope, $http) {

  // Simple GET request example :
  $http.get('http://localhost:8080/violations').
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.violations = data;
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
})

.controller('ViolationCtrl', function($scope, $http, $stateParams) {

  $scope.signIn = function(user) {
    console.log('Sign-In', user);

    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    $http.post('http://localhost:8080/violations/' + $stateParams.violationId, {
      checked: user.checked,
      comment: user.comment
    }, config).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };


})

.controller('ApplicationsCtrl', function($scope, $http) {

  $scope.applications = [{
    id: 'kio',
    name: 'Kio',
    description: 'Application registry',
    url: 'http://localhost:8080'
  }, {
    id: 'fullstop',
    name: 'Fullstop',
    description: 'Audit reporting',
    url: 'http://localhost:8080'
  }, {
    id: 'pierone',
    name: 'Pierone',
    description: 'Docker registry',
    url: 'http://localhost:8080'
  }];
})

.controller('ApplicationCtrl', function($scope, $http, $stateParams) {
  $scope.application = {
    id: 'fullstop',
    name: 'Fullstop',
    description: 'Audit reporting',
    url: 'http://localhost:8080'
  }

})

.controller('AddApplicationCtrl', function($scope) {})


.controller('GithubCtrl', function($scope, $http) {

  // Simple GET request example :
  $http.get('https://api.github.com/orgs/zalando-stups/repos').
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.github = data;
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
})

.factory('ApplicationsDataService', function($q, $timeout) {

  var searchApplications = function(searchFilter) {

    console.log('Searching applications for ' + searchFilter);

    var deferred = $q.defer();

    var matches = applications.filter(function(application) {
      if (application.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !==
        -1) return true;
    });

    $timeout(function() {

      deferred.resolve(matches);

    }, 100);

    return deferred.promise;

  };

  return {

    searchApplications: searchApplications

  }
})

.controller('SearchCtrl', ['$scope', 'ApplicationsDataService', function($scope,
  ApplicationsDataService) {

  $scope.myTitle = 'Auto Complete Example';

  $scope.data = {
    "applications": [],
    "search": ''
  };

  $scope.search = function() {

    ApplicationsDataService.searchApplications($scope.data.search).then(
      function(matches) {
        $scope.data.applications = matches;
      }
    )
  }

}]);
