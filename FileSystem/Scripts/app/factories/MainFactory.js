var MainFactory = function ($http, $q) {
    var factory = {};

    factory.GetDirectoryEntry = function (path) {
        if(typeof path === 'undefined')
            path = '';

        var deferred = $q.defer();

        $http.get("/api/Home/GetDirectoryEntry?path=" + path)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    factory.GetFilesCount = function (path) {
        if (typeof path === 'undefined')
            path = '';

        var deferred = $q.defer();

        $http.get("/api/Home/GetFilesCount?path=" + path)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    };

    return factory;
}

MainFactory.$inject = ["$http", "$q"];
app.factory("MainFactory", MainFactory);