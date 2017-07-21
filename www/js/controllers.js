angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope, apiGateWay) {
      
    $scope.page = 1;
    $scope.currentPage = $scope.page;
    $scope.search = {keyword : ''};
    $scope.isPrevious = false;
    
    $scope.searchedDataArray = [];
    $scope.seachMovie = function(page){
        
        $scope.page = page || $scope.page;

        
        var paramJsonObj = {apikey: "6db0d18f", keyword: $scope.search.keyword, page: $scope.page}
        
        var toastMsg = (!page) ? 'Loading...' : 'Searching...';
        apiGateWay.toast(true, toastMsg);
        
        apiGateWay.getMovie(paramJsonObj).then(function(response){
            if(response.Response=='True'){
                $scope.searchedDataArray = [];
                $scope.totalRecord = response.totalResults;
                $scope.totalPage = parseInt($scope.totalRecord / 10) + (($scope.totalRecord % 10) ? 1 : 0);
                
                setTimeout(function(){
                    $scope.searchedDataArray = response.Search;
                    apiGateWay.toast(false);    
                }, 500);
               
                            
            }else{
                apiGateWay.toast(true, response.Error, 2000);
            }
        }, function(error){
            apiGateWay.toast(true, error, 2000);
        })
        
    }

    
    $scope.getNextResult = function(){
        $scope.isPrevious = false;
        $scope.page ++;
        $scope.seachMovie();
    }
    
    $scope.getPreviousResult = function(){
        $scope.isPrevious = true;
        $scope.page--;
        $scope.seachMovie();
    }
})
   
.controller('detailsCtrl', function($scope, $state, $stateParams, apiGateWay) {
    
    if(!$stateParams.imdbID){
        $state.go('menu.home');
    }
    
    var imdbID = $stateParams.imdbID;
    var jsonObj = {i: imdbID};
    apiGateWay.toast(true, 'Loading...');
    apiGateWay.getMovie(jsonObj).then(function(response){
        if (response.Response=='True') {
           $scope.movieDetailObj = response;
           apiGateWay.toast(false);
        }else{
            apiGateWay.toast(true, response.Error, 2000);
        }
    });
    

})
    