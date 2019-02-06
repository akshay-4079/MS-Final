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
