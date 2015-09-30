var app = angular.module('VandyRadioGameApp',["pubnub.angular.service"]);
      app.controller("MainCtrl", function($rootScope, $scope, PubNub){
        $scope.userId = "User " + Math.round(Math.random()*1000);
        $scope.channel = 'VandyRadio Gamecast';

        if (!$rootScope.initialized) {
          PubNub.init({
            subscribe_key: 'demo',
            publish_key: 'demo',
            uuid:$scope.userId
          });
          $rootScope.initialized = true;
        }

        PubNub.ngSubscribe({ channel: $scope.channel });

        $rootScope.$on(PubNub.ngMsgEv($scope.channel), function(ngEvent, payload) {
          $scope.$apply(function() {
            $scope.state = payload.message;
          });
        });

        $scope.reset = function() {
          $scope.state = {
            title: "Live Game",
	    datetime: "",
            teamone: "Vanderbilt",
            teamtwo: "Away team",
            scoreone: 0,
            scoretwo: 0,
            time: "",
	    period: "",
            last_play: ""
          };

        };

        $scope.reset();
      });