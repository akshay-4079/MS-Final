
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

