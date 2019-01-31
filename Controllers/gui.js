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
        $scope.ChangeBck=function(a){
            BGDService.Changeback(a);
    }
      
    }
    app.controller("UI",UI);
   
}());
