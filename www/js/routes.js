angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states

  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  
.state('menu', {
  url: '/menu',
  templateUrl: 'templates/menu.html',
  abstract:true
})

.state('menu.home', {
    url: '/search-movie',
    views: {
      'page-content': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

.state('menu.detail', {
  url: '/movie-detail/:imdbID',
  views: {
      'page-content': {
          templateUrl: 'templates/details.html',
          controller: 'detailsCtrl'
      }
    }
})


$urlRouterProvider.otherwise('/menu/search-movie')

  

});