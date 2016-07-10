var app = angular.module('myApp', ['ngResource']);
app.controller('myCtrl', function($scope, myResource) {

    $scope.cep = ""; 
    $scope.showform = false;

    $scope.findCep = function () {

    	myResource.get({
    		'cep': $scope.cep
    	}).$promise
		.then(function success(result){
			
			$scope.showform = !$scope.showform;
			
			$scope.cep = result.cep;
			$scope.bairro = result.bairro;
			$scope.complemento = result.complemento;
			$scope.gia = result.gia;
			$scope.ibge = result.ibge;
			$scope.localidade = result.localidade;
			$scope.logradouro = result.logradouro;
			$scope.uf = result.uf;
			$scope.unidade = result.unidade;

		}).catch(function error(msg) {

			$scope.showform = false;
			console.error('Error');

		});
    }

    var geocoder;
	var map;
	var marker;
	initialize();
	function initialize() {
	    var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	    var options = {
	        zoom: 5,
	        center: latlng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	 
	    map = new google.maps.Map(document.getElementById("mapa"), options);
	 
	    geocoder = new google.maps.Geocoder();
	 
	    marker = new google.maps.Marker({
	        map: map,
	        draggable: true,
	    });
	 
	    marker.setPosition(latlng);
	}
	$scope.carregarNoMapa = function(endereco) {
	    geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {
	            if (results[0]) {
	                var latitude = results[0].geometry.location.lat();
	                var longitude = results[0].geometry.location.lng();
	                var location = new google.maps.LatLng(latitude, longitude);
	                
	                marker.setPosition(location);
	                map.setCenter(location);
	                map.setZoom(16);
	            }
	        }
	    });
	}
});

app.factory('myResource', function ($resource) {
	
	var rest = $resource('https://viacep.com.br/ws/:cep/json/',{
        'cep': ''
      }
    );
    return rest;
    
});