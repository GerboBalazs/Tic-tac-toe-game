'use strict'
var counter=0;
var winner = new Boolean(false);
function step(id){
    var player=counter%2==0?"X":"O";
    //If there is no winner:
    if(counter==9){
        alert("The game ends with draw.")
        clearTable();
    }
    //If there is winner
    if(winner==true){
        clearTable();
    }
    else if(player=="X"){
        if(document.getElementById(id).innerHTML==""){
        document.getElementById(id).innerHTML="X";
        counter++;
        }
    }
    else{
        if(document.getElementById(id).innerHTML==""){
        document.getElementById(id).innerHTML="O";
        counter++;
    }

    }
    winnerFindRow(0,3,player);
    winnerFindRow(3,6,player);
    winnerFindRow(6,9,player);
    winnerFindCol(0,7,player);
    winnerFindCol(1,8,player);
    winnerFindCol(2,9,player);
    winnerFindDiagonal(player);

    
}
function winnerFindRow(from, to, player){
    var count=0;
    for(var i=from; i<to; i++){
        if(document.getElementById(i).innerHTML==player){
            count++;
        }
    }
    if(count==3){
        alert("The winner is "+player);
        winner=true;
    }
    
}
function winnerFindCol(from, to, player){
    var count=0;
    for(var i=from; i<to; i+=3){
        if(document.getElementById(i).innerHTML==player){
            count++;
        }
    }
    if(count==3){
        alert("The winner is "+player);
        winner=true;
    }
    
}
function winnerFindDiagonal(player){
    var count=0;
    //Search 0-4-8 diagonal
    for(var i=0; i<10; i+=4)
    if(document.getElementById(i).innerHTML==player){
        count++;
    }
    if(count==3){
        alert("The winner is "+player);
        winner=true;
    }
    count=0;
    //Search 2-4-6 diagonal
    for(var i=2; i<7; i+=2)
    if(document.getElementById(i).innerHTML==player){
        count++;
    }
    if(count==3){
        alert("The winner is "+player);
        winner=true;
    }

}
function clearTable(){
    counter=0;
    for(var i=0; i<=8; i++){
        document.getElementById(i).innerHTML="";
    }
    winner=false;
}