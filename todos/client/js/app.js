var app = angular.module('app1', ['lbServices']);

app.controller('app1Controller',
	['$scope','Todo',function($scope,Todo){
		$scope.todos=[];
		$scope.todosdone=[];
		$scope.newTodo={
			name: "",
			desc: "",
			important: false
		}

		function getTodos() {
			Todo
			.find()
			.$promise
			.then(function(results) {
				for(i=0;i<results.length;i++) {
					if(results[i].done===false) {
						$scope.todos.push(results[i]);
					}else{
						$scope.todosdone.push(results[i]);
					}
				}
				
				console.log($scope.todos);
				console.log($scope.todosdone);
				console.log(results);			

			});
		}

		getTodos();

		$scope.aggiungitodo=function(){
			console.log($scope.newTodo)
		}

		$scope.cancellatodo=function(idtodo) {
			console.log(idtodo)
		} 

		$scope.eseguitodo=function(idtodo) {
			for(i=0;i<$scope.todos.length;i++) {
				if($scope.todos[i].id=idtodo) {
					$scope.todos[i].done=true;
					Todo.upsert($scope.todos[i]);
					$scope.todos=[];
					$scope.todosdone=[];
					getTodos();
					break;
				}
			}
			Todo.upsert();
		}
	}]);