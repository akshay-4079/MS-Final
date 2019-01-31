var counterw=0;
var counterl=0;
var curScore=0;
var hiScore=0;
var basScore=100;
var mines=0;
var ModeName='Easy';
var multiplier=0.7;
var Song="/Assets/Bgm.mp3";
var GameState=0;



(function(){
    
 var app=angular.module("UIX",["ngRoute"]);   
    
    app.config(function($routeProvider){
    $routeProvider
    .when("/main",{
        templateUrl:"Views/ui.html",
        controller:"UI"
    })
    .when("/Game",{
        templateUrl:"Views/Easy.html",
        controller:"MSEasy"
    })
         .when("/Time",{
        templateUrl:"Views/Timed.html",
        controller:"MSTim"
    })
        
          .otherwise({redirectTo:"/main"}) 
    
    });
    
    
}());


