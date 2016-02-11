angular.module('mainApp',[]).controller('mainController',function($q){
	console.log($q+".///")
	
	/******

	 function Q(resolver) {
    if (!isFunction(resolver)) {
      throw $qMinErr('norslvr', "Expected resolverFn, got '{0}'", resolver);
    }

    if (!(this instanceof Q)) {
      // More useful when $Q is the Promise itself.
      return new Q(resolver);
    }

    var deferred = new Deferred();

    function resolveFn(value) {
      deferred.resolve(value);
    }

    function rejectFn(reason) {
      deferred.reject(reason);
    }

    resolver(resolveFn, rejectFn);

    return deferred.promise;
  }

	 * ***/
	/*
	 
	 * defer对象
	 * 通过$q.defer()构建deffered实例，通过deffered实例建立与promise对象的联系(defer.promise).并将执行任务的状态发送给promise对象，promise对象根据接受的状态执行对应的回调
	 *方法
	 * deffered.resolve 向promise对象发送执行成功消息
	 * deffered.reject  向promise对象发送执行失败消息
	 * deffered.notify  向promise对象发送执行过程中的状态更新，在任务成功或失败之前会多次调用
	 * 属性
	 * promise
	 * 与deffered向关联的promise对象
	 * 
	 * 当创建deffered对象时，会创建一个新的promise对象，通过deffered.promise 得到对象的引用
	 * 
	 * promise对象的目的在于当defferred任务完成时，允许对应的回调函数对结果进行操作。即 promise对象的执行体是否执行依赖于 deffered.resolve()/deffered.reject()/deffered.notify() 
	 * 
	 * 
	 * 
	 * 
	 * promise对象
	 * 方法
	 * promise.then(successFn,errorFn,notifyFn)
	 * 不管promise(承诺的任务)是成功还是失败，一旦结果可用(deffered.resolve() deffered.reject()  deffered.notify() ),then 会马上异步调用对应的回调函数。
	 * then函数会返回一个新的promise对象
	 * 
	 * promise.catch(errorFn)  是promise.then(null,errorCallBack)的快捷方式
	 * promise.finally()       
	 * */
	
// function asyncGreet(name) {
//  // perform some asynchronous operation, resolve or reject the promise when appropriate.
//   return $q(function(resolve, reject) {
//    setTimeout(function() {
//       if (name) {
//        setTimeout(function(){
//        	   resolve('Hello, ' + name + '!');
//        },2000)
//        /*
//         * resolve 向promise 对象异步执行体发送消息，告知已成功完成任务 
//         * */
//      } else {
//         reject('Greeting ' + name + ' is not allowed.');
//         /**
//          * reject 向promise 对象异步执行体发送消息，告知不可能完成此任务
//			*/
//       }
//    }, 1000);
//   });
// }
//
////promise 对象可以通过 defer.promise获取
//var promise = asyncGreet('Robin Hood');
////待resolve 或者reject 消息发送完毕，promise会调用现有的回调函数
// promise.then(function(greeting) {
//   alert('Success: ' + greeting);
// }, function(reason) {
//   alert('Failed: ' + reason);
// });
   
   
   
  //demo 1  promise 回调函数的执行依赖于 deffered.resolve()消息
  var deffered = $q.defer();
  var promise_demo1 = deffered.promise;
  promise_demo1.then(function(req){
   console.log($q.reject('success:')+req)
  }, function(res){
   console.log($q.reject('error')+res+"...")
  });
//  deffered.resolve(1);
 deffered.reject(1)
 
 
 
 /********************************************************/

/*
 *$q.all()
 * 结合多个promise为单个promise，所传入的promise都处理完毕后，组合之后的promise才会执行
 * 
 * */


//demo 2 $q.all()
var deffered_1 = $q.defer();
var promise_all_1 = deffered_1.promise;

promise_all_1.then(function(){
	console.log('success fn1')
},function(){
	console.log('errors fn1')
});

var deffered_2 = $q.defer();
var promise_all_2 = deffered_2.promise;

promise_all_2.then(function(){
	console.log('success fn2')
},function(){
	console.log('error fn2');
})

var promise_all_3 = $q.all([promise_all_1,promise_all_2]);

promise_all_3.then(function(){
	console.log('$q.all success')
},function(){
	console.log('$q.all error');
});

//deffered_1.resolve(1);
//deffered_2.resolve(1);

deffered_1.reject(1)
});


/******************************************************/
/*
 
 * $q.when()
 * 作用：降一个对象包装为$q promise。 
 * 在你不确定所处理的对象是否是一个promise时，很有用。有可能该对象来自一个不被信任的源头
 * 
 * 
 * */