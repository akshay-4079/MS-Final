




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
    var count=0;
   count++;
return count;
}


function placeManyRandomMines(minefield) {
    var j=0;
    for(var i = 0; i < 10; i++) {
        j++;
        placeRandomMine(minefield);
    
    }
    return j
}

function calculateNumber(minefield, row, column) {
    var thisSpot = getSpot(minefield, row, column);
    
    // if this spot contains a mine then we can't place a number here
    if(thisSpot.content == "mine") {
        return;
    }
    
    var mineCount = 0;

    // check row above if this is not the first row
    if(row > 0) {
        // check column to the left if this is not the first column
        if(column > 0) {
            // get the spot above and to the left
            var spot = getSpot(minefield, row - 1, column - 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }

        // get the spot right above
        var spot = getSpot(minefield, row - 1, column);
        if(spot.content == "mine") {
            mineCount++;
        }

        // check column to the right if this is not the last column
        if(column < 8) {
            // get the spot above and to the right
            var spot = getSpot(minefield, row - 1, column + 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
    }

    // check column to the left if this is not the first column
    if(column > 0) {
        // get the spot to the left
        var spot = getSpot(minefield, row, column - 1);
        if(spot.content == "mine") {
            mineCount++;
        }
    }
    
    // check column to the right if this is not the last column
    if(column < 8) {
        // get the spot to the right
        var spot = getSpot(minefield, row, column + 1);
        if(spot.content == "mine") {
            mineCount++;
        }
    }

    // check row below if this is not the last row
    if(row < 8) {
        // check column to the left if this is not the first column
        if(column > 0) {
            // get the spot below and to the left
            var spot = getSpot(minefield, row + 1, column - 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }

        // get the spot right below
        var spot = getSpot(minefield, row + 1, column);
        if(spot.content == "mine") {
            mineCount++;
        }

        // check column to the right if this is not the last column
        if(column < 8) {
            // get the spot below and to the right
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

var MSEasy=function($scope,BGDService) {
    $scope.minefield = createMinefield();
    var bgm=new sound("assets/Bgm.mp3");
    var bom=new sound("assets/Explosion+3.mp3");

    var bgm=new sound("Bgm.mp3");
    var bom=new sound("Explosion+3.mp3");

    $scope.new=$scope.minefield
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
       $scope.retry=function(){
           window.location.reload();
       }
    $scope.uncoverSpot = function(spot) {
        spot.isCovered = false;
        
        if(spot.content == "mine") {
            $scope.hasLostMessageVisible = true;
        bom.play();
            bgm.stop();
            
        } 
        else {
            if(hasWon($scope.minefield)) {
                $scope.isWinMessageVisible = true;
            }
        }

    
    };
}
