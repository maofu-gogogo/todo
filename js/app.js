(function(angular) {
  'use strict';

  // Your starting point. Enjoy the ride!
	var app = angular.module('todos',[]);
	app.controller('todosController',['$scope','$location',function($scope,$location){
		// console.log($location.url());
		// var tasks = [{
    //   id: 1,
    //   name: '吃饭',
    //   completed: false
    // }, {
    //   id: 2,
    //   name: '睡觉',
    //   completed: true
    // }, {
    //   id: 3,
    //   name: '学习',
    //   completed: false
    // }, {
    //   id: 4,
    //   name: '休息',
    //   completed: true
    // }, {
    //   id: 5,
    //   name: '打球',
    //   completed: true
    // }];

		var data = localStorage.getItem('tasks')||'[]';//思考这里为什么要用一个空数组的字符串？
    $scope.tasks = JSON.parse(data);

				$scope.add = function(){
					if($scope.newTask=='')return;
					var id;
					// if(!$scope.tasks){ <-- 视频中的判断条件有问题，因为数组判断总是为true
					if($scope.tasks.length == 0){
						id = 1;
					}else{
						id = $scope.tasks[$scope.tasks.length - 1].id + 1; 
					}
					$scope.tasks.push({id:id,name:$scope.newTask,completed:false});
					$scope.newTask = '';
		};

		$scope.remove = function(id){
			console.log(id);
			for(var i=0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(item.id == id){
					$scope.tasks.splice(i,1);
					return;
				}
			}
	};

	$scope.isEditingId = -1;
	$scope.edit = function(id){
		$scope.isEditingId = id;
	};

	$scope.save = function(){
		$scope.isEditingId = -1;
	};

	$scope.isSelected = false;
	$scope.toggleAll = function(){
		for(var i=0;i<$scope.tasks.length;i++){
			var item = $scope.tasks[i];
			item.completed = $scope.isSelected;
		}
	};

	// 功能7 清除已完成任务
    $scope.clearCompleted = function() {
      // 尽量不要在循环中删除或添加数据中的元素。
      // for (var i = 0; i < $scope.tasks.length; i++) {
      //   // i=0 , length 5
      //   // i=1 , length 4
      //   // i=2 , length 4
      //   // i=3 , length 3
      //    var item =  $scope.tasks[i];
      //    if(item.completed){
      //      $scope.tasks.splice(i,1);
      //    }
      // }
      //
      var tmp = [];

      // 将未完成的任务添加到临时数组中
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        if (!item.completed) {
          tmp.push(item);
        }
      }

      $scope.tasks = tmp;


    }


		// 功能7.1 控制清除已完成任务按钮的显示与否
    $scope.isShow = function() {
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        if (item.completed) {
          return true;
        }
      }
      return false;
    }



		// 功能8 显示未完成的任务数

    $scope.unCompleted = function() {
      var count = 0;
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        if (!item.completed) {
          count++;
        }
      }
      return count;
    }


	//功能9  切换不同状态任务的显示与否
		$scope.isCompleted = {};
		$scope.active = function(){
			$scope.isCompleted = {completed:false};
		};
		$scope.completed = function(){
			$scope.isCompleted = {completed:true};
		};
		$scope.all = function(){
			$scope.isCompleted = {};
		};

		// var hash = $location.url();
		//这块如果用hashchange事件的话 --> 需要进行dom操作，这是我们angular.js不推荐的
		//根据我们前面学过的知识点，我们能够监视的是我们的数据模型 ---> 我们把$location挂载到我们的
		//$scope身上，这样就可以实现自动监视了
		$scope.location = $location;
		$scope.$watch('location.url()',function(nowValue,oldValue){
			switch(nowValue){
				case '/active':
					$scope.isCompleted = {completed:false};
					break;
				case '/completed':
					$scope.isCompleted = {completed:true};
					break;
				case '/':
					$scope.isCompleted = {completed:undefined};
					break;
			}
		});

		$scope.$watch('tasks',function(){
			var data = JSON.stringify($scope.tasks);
			localStorage.setItem('tasks',data);
		},true);

	}]);
})(angular);
