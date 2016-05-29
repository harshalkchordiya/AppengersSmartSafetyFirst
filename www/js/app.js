// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var test = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'testCtrl'
        }
      }
    })
	.state('tabs.scan_c', {
      url: "/scan_c",
      views: {
        'home-tab': {
          templateUrl: "templates/scan_citizen.html",
		  controller:'testCtrl'
        }
      }
    })
		.state('tabs.scan_p', {
      url: "/scan_p",
      views: {
        'home-tab': {
          templateUrl: "templates/scan_police.html",
		  controller:'testCtrl'
        }
      }
    })
		.state('tabs.scan_r', {
      url: "/scan_r",
      views: {
        'home-tab': {
          templateUrl: "templates/scan_rto.html",
		  controller:'testCtrl'
        }
      }
    })

    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })

    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

test.controller('testCtrl', function($scope, $cordovaBarcodeScanner) {

$scope.result = {text1 : "",text2 : "",text3 : "",text4 : "",text4a : "",text5 : "",text6 : ""};


$scope.scanBarcode = function(type) {
    $scope.result.text1 = "";
	$scope.result.text2 = "";
	$scope.result.text3 = "";
	$scope.result.text4 = "";
	$scope.result.text4a = "";
	$scope.result.text5 = "";
	$scope.result.text6 = "";
	 $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
		//alert("Data in the QR code is 2=="+barcodeData.format);
		if(barcodeData.text == "")
		{
					
		
				$scope.result.text1 = "ERROR";
				$scope.result.text2 = "SCAN TYPE - "+type;				
				$scope.result.text3 = "Scanned QR Code is - "+barcodeData.text;
				$scope.result.text4 = "It seems you did not scan QR code or there was some issue with the QR code.";
				$scope.result.text4a = "";
				$scope.result.text5 = "";
				$scope.result.text6 = "";
		
				
		}
		else
		{
			if(barcodeData.text == "TAXI_REG_1") 
			{				
				$scope.result.text1 = "SUCCESS";				
				$scope.result.text2 = "SCAN TYPE - "+type;
				$scope.result.text3 = "Scanned QR Code is for TAXI and key is - "+barcodeData.text;
				$scope.result.text4 = "Taxi Driver Name - Smith";
				$scope.result.text4a = "Verified TAXI, Good to travel with!";
				
				if(type=="Police")
				{
					$scope.result.text5 = "img/"+barcodeData.text+".jpg";
				}
				else
				{
					$scope.result.text5 = "";
				}
				if(type=="RTO" || type=="Police")
				{
					$scope.result.text6 = "Taxi Number - MH 12 LW 3579";
				}
				else
				{
					$scope.result.text6 = "";
				}
			}
			else if(barcodeData.text == "TAXI_REG_2") 
			{
				$scope.result.text1 = "SUCCESS";				
				$scope.result.text2 = "SCAN TYPE - "+type;
				$scope.result.text3 = "Scanned QR Code is for TAXI and key is - "+barcodeData.text;
				$scope.result.text4 = "Taxi Driver Name - David";
				$scope.result.text4a = "TAXI not verified, think before travelling!";
				if(type=="Police")
				{
					$scope.result.text5 = "img/"+barcodeData.text+".jpg";
				}
				else
				{
					$scope.result.text5 = "";
				}
				if(type=="RTO" || type=="Police")
				{
					$scope.result.text6 = "Taxi Number - MH 12 LW 1234";
				}
				else
				{
					$scope.result.text6 = "";
				}
			}
			else if(barcodeData.text == "AUTO_REG_1") 
			{
				$scope.result.text1 = "SUCCESS";				
				$scope.result.text2 = "SCAN TYPE - "+type;
				$scope.result.text3 = "Scanned QR Code is for AUTO and key is - "+barcodeData.text;
				$scope.result.text4 = "Auto Driver Name - Sameer";
				$scope.result.text4a = "Verified AUTO, Good to travel with!";
				if(type=="Police")
				{
					$scope.result.text5 = "img/"+barcodeData.text+".jpg";
				}
				else
				{
					$scope.result.text5 = "";
				}
				if(type=="RTO" || type=="Police")
				{
					$scope.result.text6 = "Auto Number - MH 12 LW 5678";
				}
				else
				{
					$scope.result.text6 = "";
				}
			}
			else
			{
				$scope.result.text1 = "SUCCESS";				
				$scope.result.text2 = "SCAN TYPE - "+type;
				$scope.result.text3 = "Scanned QR Code is - "+barcodeData.text;
				$scope.result.text4 = "Taxi/Auto details not found!";
				$scope.result.text5 = "";
				$scope.result.text6 = "";
			}						
		}
		
		
      }, function(error) {
		
				$scope.result.text1 = "ERROR";
				$scope.result.text2 = "SCAN TYPE - "+type;				
				$scope.result.text3 = "Scanned QR Code is - "+barcodeData.text;
				$scope.result.text4 = "It seems you did not scan QR code or there was some issue with the QR code.";
				$scope.result.text4a = "";
				$scope.result.text5 = "";
				$scope.result.text6 = "";
			
 
      });
	};
		
});

