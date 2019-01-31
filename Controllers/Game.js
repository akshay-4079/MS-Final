
(function(){

var app= angular.module("UIX");
var MSEasy=function($scope,BGDService,GamePlay) {
$scope.minefield = GamePlay.createMinefield();
    var bgm= new BGDService.makesound(Song);
    var bom= new BGDService.makesound("assets/Explosion+3.mp3");
    bgm.play();
    $scope.mode=ModeName +' Mode';
$(window).on('popstate', function() {
		  bgm.stop();
		});
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
        if(spot.content == "mine") {
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
 
