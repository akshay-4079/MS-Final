
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

  function ChangeBck(a){
    if (a=='i1')
    {
        document.getElementById('area').style.backgroundImage="url(https://www.pixelstalk.net/wp-content/uploads/2016/07/8-Bit-Backgrounds.jpg)";}
     if (a=='i2')
    {
        document.getElementById('area').style.backgroundImage="url(https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/dHnxL5V/retro-video-game-3d-landscape-computer-vector-8-bit-arcade-flyover-wireframe-terrain-4k_nwly8eeae__F0000.png)";}
     if (a=='i3')
    {
        document.getElementById('area').style.backgroundImage="url(https://media.giphy.com/media/l0HlM6oMVfvqZgSMU/giphy.gif)";}
     if (a=='i4')
    {
        document.getElementById('area').style.backgroundImage="url(https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/geometric-8-bit-game_wjbjcv-r__F0000.png)";}
  }