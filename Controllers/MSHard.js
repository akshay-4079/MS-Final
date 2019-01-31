
(function(){
    var app= angular.module("UIX");
    
function sound(src) {
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
function createMinefield() {
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

function getSpot(minefield, row, column) {
    return minefield.rows[row].spots[column];
}

function placeRandomMine(minefield) {
    var row = Math.round(Math.random() * 8);
    var column = Math.round(Math.random() * 8);
    var spot = getSpot(minefield, row, column);
    spot.content = "mine";
    var count=1;
    return count;
}

function placeManyRandomMines(minefield) {
   j=0;
    for(var i = 0; i < 25; i++) {
       j++;
        placeRandomMine(minefield);
    }
return j;
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
    
    return true;
}

var MSHard=function($scope) {
    $scope.minefield = createMinefield();
    var bgm=new sound("assets/HT.mp3");
    var bom=new sound("assets/Explosion+3.mp3");
    bgm.play();
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
         var multiplier=1.2;
        var addScore=multiplier*basScore;
        if (spot.isCovered==true)
        {
        if(spot.content=="empty"){
            sessionscore+=addScore;
        }
         if(spot.content=="1"){
           sessionscore+=addScore*1.5;
        }
                 if(spot.content=="2"){
            sessionscore+=addScore*2;
        }
                 if(spot.content=="3"){
           sessionscore+=addScore*3;
        }
               if(spot.content=="4"){
           sessionscore+=addScore*4;
        }
               if(spot.content=="5"){
           sessionscore+=addScore*5;
        }
               if(spot.content=="6"){
            sessionscore+=addScore*6;
        }
               if(spot.content=="7"){
           sessionscore+=addScore*7;
        }
               if(spot.content=="8"){
           sessionscore+=addScore*8;
        }
         if(spot.content=="9"){
            sessionscore+=addScore*9;
        }
        }
        spot.isCovered = false;
        
        if(spot.content == "mine") {
            $scope.hasLostMessageVisible = true;
            if(count==0)
               {
            temp=sessionscore;
                   sessionscore=temp;
                    lossTrack();
               }
            count++;
        bom.play();
            bgm.stop();
        } 
        else {
            if(hasWon($scope.minefield)) {
                $scope.isWinMessageVisible = true;
            temp=sessionscore;
                sessionscore=temp;
            winTrack();
            
            }
        }
    if(temp==0 & count==0)
        {
            $scope.score=sessionscore;
             curScore=sessionscore;

        }
    };

}
app.controller("MSHard",MSHard);
}());