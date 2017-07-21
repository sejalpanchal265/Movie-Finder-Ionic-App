angular.module('app.services', [])

.service('apiGateWay', ['$q', '$http', '$ionicLoading', 'CONFIG', function($q, $http, $ionicLoading, CONFIG){
    return {
        getMovie: function(params){
            params = params || {};
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: CONFIG.apiUrl,
                params: params,
            }).then(function successCallback(response) {
                if (response.statusText=='OK') {
                    deferred.resolve(response.data);  
                }else{
                  deferred.reject({Response: false, Error: 'Either server not found OR unable to connect with server. Please try again!'});
                }
            }, function errorCallback(response) {
                deferred.reject({Response: false, Error: 'Either server not found OR unable to connect with server. Please try again!'});
            });
            return deferred.promise;
        },
        
        
        toast: function(show, msg, duration){
            var text = msg || 'Loading...'
            var defaultDuration = (duration) ? duration : false;
            if (show) {
                $ionicLoading.hide();
                $ionicLoading.show({
                  template: text,
                  duration: defaultDuration
                });
            }else{
                $ionicLoading.hide();
            }
        }
    }
}]);

