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