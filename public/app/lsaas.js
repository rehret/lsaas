(function() {
    angular.module("lsaas", [])
    .controller("lsaasController", ["$scope", "$window", function($scope, $window) {
        $scope.placeholder = "YOUR TEXT HERE";
        $scope.imageSrc = getImageUrl($scope.placeholder);

        function getImageUrl(text) {
            return $window.location.origin + $window.location.pathname + "api/?text=" + encodeURIComponent(text);
        }

        $scope.updateImage = function(text) {
            $scope.imageSrc = getImageUrl(text);
        };
    }])
    .directive('selectOnClick', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('focus', function () {
                    if (!$window.getSelection().toString()) {
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            }
        };
    }]);
})();