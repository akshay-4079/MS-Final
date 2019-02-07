# About the App

This is a recreation of the popular windows game Minecraft rebuilt using AngularJs. Other tools used are HTML 5, CSS.

The pages are styled using Bootstrap CSS

## Proposed Features

1. Win and Lose Counter.
2. Scoring System.
3. Facility to Change Background.
4. Change the SoundTrack.
5. Sign In Function to regulate User Access.
6. Various Difficulty Settings.



# App Design

## Architecture

The app is designed using the Model View and Controller Logic.

The application module holds the Game Controller and the User Experience Controller, and the Sign In Controller.

There are three views:

1. The Opening Page
2. The Game / Application Page
3. The Sign in or Sign Up Page 

Each view has a specific controller attached to it.

The sign up/Sign in page will only allow the users to fully access the game. A guest is only allowed to play the game for five times after which he is directed to the home page asking him to sign in/ sign up.

The game has only one controller which initialises with different values based on difficulty selected.

All the other functions are coded as services.

The initial wireframes are shown as follows.

![Opening Screen](https://github.com/akshay-4079/MS-Final/blob/master/Assets/Wireframes/Opening%20Screen-9512133.jpg)

![PlayArea](https://github.com/akshay-4079/MS-Final/blob/master/Assets/Wireframes/PlayArea%20(1)-9512453.png)



## Interaction Between Various Elements

![Untitled Diagram](https://github.com/akshay-4079/MS-Final/blob/master/Assets/Wireframes/Untitled%20Diagram.jpg)

# Code

The entire game logic is broken down into controllers and services as shown above. 

## App.js

```javascript
var counterw=0;
var counterl=0;
var curScore=0;
var hiScore=0;
var basScore=100;
var mines=localStorage.getItem("mines");
var multiplier=localStorage.getItem("multiplier");
var Song=localStorage.getItem("Song");
var ModeName=localStorage.getItem("mode");  
var multiplier=0.7;
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
         
        
          .otherwise({redirectTo:"/main"}) 
    
    });
    
    
}());
```



## Background Services

```javascript

var app= angular.module("UIX");
app.service('BGDService', function() {
  this.winTrack = function () {
    counterw++;
    localStorage.setItem("win",counterw);

  }
  this.LossTrack=function(){
      counterl++;
localStorage.setItem("loss",counterl);
  }

this.makesound= function(src)
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }  
}

});
```

## Gameplay Services

```javascript
var app= angular.module("UIX");
 function placeRandomMine(minefield) {
    var row = Math.round(Math.random() * 8);
    var column = Math.round(Math.random() * 8);
    var spot = getSpot(minefield, row, column);
    spot.content = "mine";
}

function placeManyRandomMines(minefield) {
    for(var i = 0; i <mines; i++) {
        placeRandomMine(minefield);
    }
}
 
function getSpot(minefield, row, column) {
    return minefield.rows[row].spots[column];
}



function calculateNumber(minefield, row, column) {
    var thisSpot = getSpot(minefield, row, column);
    if(thisSpot.content == "mine") {
        return;
    }
    var mineCount = 0;
    if(row > 0) {
        if(column > 0) {
            var spot = getSpot(minefield, row - 1, column - 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
        var spot = getSpot(minefield, row - 1, column);
        if(spot.content == "mine") {
            mineCount++;
        }
        if(column < 8) {
            var spot = getSpot(minefield, row - 1, column + 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
    }
    if(column > 0) {
        var spot = getSpot(minefield, row, column - 1);
        if(spot.content == "mine") {
            mineCount++;
        }
    }
    if(column < 8) {
        var spot = getSpot(minefield, row, column + 1);
        if(spot.content == "mine") {
            mineCount++;
        }
    }
    if(row < 8) {
        if(column > 0) {
            var spot = getSpot(minefield, row + 1, column - 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
        var spot = getSpot(minefield, row + 1, column);
        if(spot.content == "mine") {
            mineCount++;
        }
        if(column < 8) {
            var spot = getSpot(minefield, row + 1, column + 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
    }
    
    if(mineCount > 0) {
        thisSpot.content = mineCount;
    }
}

function calculateAllNumbers(minefield) {
    for(var y = 0; y < 9; y++) {
        for(var x = 0; x < 9; x++) {
            calculateNumber(minefield, y, x);
        }
    }
}
   
function hasWon(minefield) {
    for(var y = 0; y < 9; y++) {
        for(var x = 0; x < 9; x++) {
            var spot = getSpot(minefield, y, x);
            if(spot.isCovered && spot.content != "mine") {
                return false;
            }
       }

    
    }
    if(GameState=1){return false;}
    return true;
}
app.service('GamePlay', function(){
    this.createMinefield=function() {
    var minefield = {};
    minefield.rows = [];
    
    for(var i = 0; i < 9; i++) {
        var row = {};
        row.spots = [];
        
        for(var j = 0; j < 9; j++) {
            var spot = {};
            spot.isCovered = true;
            spot.content = "empty";
            row.spots.push(spot);
        }
        
        minefield.rows.push(row);
    }
    
    placeManyRandomMines(minefield);
    calculateAllNumbers(minefield);
    
    return minefield;
}

});
```

## Gui Controller

```javascript
(function(){
    var app=angular.module("UIX");
    function display(){
    document.getElementById("wins").innerHTML=localStorage.getItem("win");
    document.getElementById("loss").innerHTML=localStorage.getItem("loss");
        if(curScore>hiScore)
            {
                hiScore=curScore;
                document.getElementById("score").innerHTML=curScore;
            localStorage.setItem("score",hiScore);
            }
        else
            {
                document.getElementById("score").innerHTML=localStorage.getItem("score");
            }
}
    var UI=function($scope,BGDService)
    {
        $scope.ok=display();
      $scope.Modselect=function(a){    
if(a=='M'){ mines=15;ModeName='Medium';Song="./Assets/MT.mp3";multiplier=1.2;GameState=0;localStorage.setItem("mode",ModeName);localStorage.setItem("mines",mines);localStorage.setItem("multiplier",multiplier);localStorage.setItem("Song",Song);}
if(a=='H'){mines=20;ModeName='Hard';Song="./Assets/HT.mp3";multiplier=1.5;GameState=0;localStorage.setItem("mode",ModeName);localStorage.setItem("mines",mines);localStorage.setItem("multiplier",multiplier);localStorage.setItem("Song",Song);}
if(a=='E'){mines=10;ModeName='Easy';Song="./Assets/Bgm.mp3";multiplier=0.7;GameState=0;localStorage.setItem("mode",ModeName);localStorage.setItem("mines",mines);localStorage.setItem("multiplier",multiplier);localStorage.setItem("Song",Song);}
if(a=='T'){mines=20;ModeName='Timed';Song="./Assets/TS.mp3";multiplier=1.5;GameState=0;localStorage.setItem("mode",ModeName);localStorage.setItem("mines",mines);localStorage.setItem("multiplier",multiplier);localStorage.setItem("Song",Song);}
      }
      $scope.BGSelect=function(){
          var Images=["BG1","BG2","BG3","BG4","BG5","BG6","BG7","BG8","BG9"]
    var min=0; 
    var max=9;  
    var random =Math.floor(Math.random() * (+max - +min)) + +min; 
var BG=Images[random];
          var urlstring='url(Assets/'+ BG +'.jpg)';
          console.log(urlstring);
           document.getElementById('area').style.backgroundImage=urlstring;
      }
      
    }
    app.controller("UI",UI);
   
}());

```

## Gameplay Controller

```javascript

(function(){

var app= angular.module("UIX");
var MSEasy=function($scope,BGDService,GamePlay,$timeout) {
$scope.minefield = GamePlay.createMinefield();
    var bgm= new BGDService.makesound(Song);
    var bom= new BGDService.makesound("assets/Explosion+3.mp3");
    bgm.play();
    
    $scope.mode=ModeName +' Mode';
$(window).on('popstate', function() {
		  bgm.stop();
		});
$scope.song=function()
{
    bgm.stop();
    var Songs=["Bgm","HT","MT","TS","M5","M6"]
    var min=0; 
    var max=6;  
    var random =Math.floor(Math.random() * (+max - +min)) + +min; 
var Song1=Songs[random];
    var srcstring="/Assets/"+Song1+".mp3";
    var b2m= new BGDService.makesound(srcstring);
    
    bgm=b2m;
    bgm.play();
}
$scope.stop=function()
{
    bgm.stop();
}
    var counter=$scope.counter;
    if(ModeName==='Timed'){
            $scope.counter=5;
    $scope.onTimeout = function(){
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    }
$scope.show=function(minefield)
            {
                for(var a=0;a<9;a++)
                    {
                        for(var b=0;b<9;b++)
                            {
                                minefield.rows[a].spots[b].isCovered=false;
                            }
                    }
            }
       var sessionscore=0;
       var temp=0;
       var count=0;    
$scope.uncoverSpot = function(spot) {
        var addScore=multiplier*basScore;
        if (spot.isCovered==true)
        {
        if(spot.content=="empty"){
            sessionscore+=addScore;
        }
         else{
           sessionscore+=addScore*parseInt(spot.content,10);
        }
        }
        spot.isCovered = false;
        if(spot.content == "mine" || $scope.counter<0) {
            $scope.hasLostMessageVisible = true;
           if(count==0)
               {
            temp=sessionscore;
                   sessionscore=temp;
                BGDService.LossTrack();
                   GameState=1;
               }
            count++;
        bom.play();
            bgm.stop(); 
        } 
        else {
            if(hasWon($scope.minefield)) 
            {
                $scope.isWinMessageVisible = true;
                temp=sessionscore;
                sessionscore=temp;
        BGDService.winTrack();
            }
        }     
    if(temp==0 & count==0)
        {
            $scope.score=sessionscore;
             curScore=sessionscore;

        }
    
    };
}
    app.controller("MSEasy",MSEasy);
}());
 

```

# Final App Screens

![Screen Shot 2019-02-06 at 10.32.14 PM](https://github.com/akshay-4079/MS-Final/blob/master/Assets/Wireframes/Screen%20Shot%202019-02-06%20at%2010.32.14%20PM.png)

![Screen Shot 2019-02-06 at 10.32.20 PM](https://github.com/akshay-4079/MS-Final/blob/master/Assets/Wireframes/Screen%20Shot%202019-02-06%20at%2010.32.20%20PM.png)
