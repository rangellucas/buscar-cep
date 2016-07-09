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
});

app.factory('myResource', function ($resource) {
	
	var rest = $resource('https://viacep.com.br/ws/:cep/json/',{
        'cep': ''
      }
    );
    return rest;
    
});