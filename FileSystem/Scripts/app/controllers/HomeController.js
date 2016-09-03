var HomeController = function ($scope, MainFactory) {
    $scope.Files = [];
    $scope.Directories = [];
    $scope.SizeCount = {};
    $scope.Path = '';

    $scope.init = function () {
        MainFactory.GetDirectoryEntry()
            .then(function (data) {
                $scope.MapData(data);
            });
    };

    $scope.GoTo = function (index) {
        var newPath = $scope.Path == ''
            ? $scope.Path + $scope.Directories[index]
            : $scope.Path + $scope.Directories[index] + '\\';

        MainFactory.GetDirectoryEntry(newPath)
             .then(function (data) {
                 $scope.MapData(data);
             });
    };

    $scope.Back = function () {
        if (!$scope.Path) return;

        var newPath = $scope.Path;
        if (/^[A-Z]:\\$/.test(newPath)) newPath = '';
        else {
            newPath = newPath.slice(0, -1);
            newPath = newPath.substr(0, newPath.lastIndexOf('\\') + 1);
        }

        MainFactory.GetDirectoryEntry(newPath)
             .then(function (data) {
                 $scope.MapData(data);
             });
    };

    $scope.MapData = function (resData) {
        $scope.Files = resData.Files
        $scope.Directories = resData.Directories;
        $scope.Path = resData.Path;
        $scope.SizeCount.Small = $scope.SizeCount.Middle = $scope.SizeCount.Big = 0;

        MainFactory.GetFilesCount($scope.Path)
            .then(function (data) {
                $scope.SizeCount = data;
            });
    };
}

HomeController.$inject = ["$scope", "MainFactory"];
app.controller("HomeController", HomeController);