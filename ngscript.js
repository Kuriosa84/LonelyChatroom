var app = angular.module('app', ['ngSanitize']);

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

//snodd kod från http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/editing-text-in-place-using-html5-content-editable.html
app.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});

app.controller('container', function($scope, $http) {
    document.getElementById('text').onkeypress=function(e){
        //keyCode 13 is the enter key
        if(e.keyCode==13 && !e.shiftKey){
            e.preventDefault();
            if($scope.messagecontent != "" && $scope.messagecontent != "<br>") {
                $scope.post();
            }
        } else if(e.keyCode== 13 && e.shiftKey) {

        }
    }
    $scope.messages = [];

    $scope.postObject = function postObject() {
        var o = {
            "username": $scope.username,
            "timestamp": ""+new Date(),
            "text": $scope.messagecontent
        };
        return o;
    };

    $scope.getChatbotGreeting = function getChatbotGreeting() {
        $http.get('http://localhost:3000').then(function(data) {
            $scope.messages.push(data.data);
            setTimeout(function() {
                var div = document.getElementById("messages");
                div.scrollTop = div.scrollHeight;
            }, 10);
        });
        document.getElementById("text").focus();
    };

    $scope.post = function post() {
        $http.post('http://localhost:3000', $scope.postObject()).then(function(data) {
            $scope.messages.push(data.data);
            setTimeout(function() {
                var div = document.getElementById("messages");
                div.scrollTop = div.scrollHeight;
            }, 10);
        });
        //$scope.text = "";
        document.getElementById("text").focus();
        //document.getElementById("text").textContent = "";
        $scope.messagecontent = "";
    };
});