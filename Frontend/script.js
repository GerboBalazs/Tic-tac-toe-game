'use strict'
var counter=0;
var winner = new Boolean(false);
var http = new XMLHttpRequest();
var gameArray = [];
class Game{
    id=null;
    board=null;
    name=null;
    
    constructor(id, board, name){
        this.id=id;
        this.board=board;
        this.name=name;
    }
}
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
//Finds winner each step at rows
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
//Finds winner each step at coulmns
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
//Clears the game table
function clearTable(){
    counter=0;
    for(var i=0; i<=8; i++){
        document.getElementById(i).innerHTML="";
    }
    winner=false;
}
//Load previously saved games
function loadGames(){
    http.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let response = JSON.parse(this.response);
            response.forEach((response) => {
                var game = new Game();
                game.board=response.board;
                game.id=response.id;
                game.name=response.name;

                gameArray.push(game);
            });
            var select = document.getElementById("gameSelect");
            gameArray.forEach((game) => {
                var opt = document.createElement("option");
                opt.value=game.board;
                opt.id=game.id;
                opt.text=game.name;
                select.appendChild(opt);
            });
        }
        else{
            if(this.readyState==4 && this.status==404){
                console.log("Cannot connect to database");
            }
        }
    }
    http.open("GET", "http://localhost:5000/boards");
    http.setRequestHeader("Content-Type", "aplication/json");
    http.send();
}
//Save the current game
function save(){
    var game = new Game();
    game.name=document.getElementById("gameName").value;
    console.log(game.name);
    var gameStateString="";
    //Creates a string with the current game state 1=X, 2=O
    for(var i=0; i<9; i++){
        if(document.getElementById(i).innerHTML==""){
            gameStateString+="0";
        }
        else if(document.getElementById(i).innerHTML=="X"){
            gameStateString+="1";
        }
        else{
            gameStateString+="2";
        }
    }
    game.board=gameStateString;
    
    http.onreadystatechange= function() {
        if(this.readyState==4 && this.status==201){
            alert("Game be saved!")
        }
        else{
        if(this.readyState==4 && this.status==400){
            alert("Cannot be saved")
        }
        }
        }
    http.open("POST", "http://localhost:5000/boards");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(game));
    
}
//Load to game board the selected game
function load(){
    var game = new Game();
    game.board=document.getElementById("gameSelect").value;
    game.name=document.getElementById("gameSelect").options[document.getElementById("gameSelect").selectedIndex].text;
    game.id=document.getElementById("gameSelect").options[document.getElementById("gameSelect").selectedIndex].id;
    document.getElementById("gameName").value=game.name;
    for(var i=0; i<9; i++){
        if(game.board[i]==0){
            document.getElementById(i).innerHTML="";
        }
        else {if(game.board[i]==1){
            document.getElementById(i).innerHTML="X";
        }
        else{
            document.getElementById(i).innerHTML="O";
        }

        }
    }
}
//Delete the selected game
function deleteGame(){
    var game = new Game();
    game.board=document.getElementById("gameSelect").value;
    game.name=document.getElementById("gameSelect").options[document.getElementById("gameSelect").selectedIndex].text;
    game.id=document.getElementById("gameSelect").options[document.getElementById("gameSelect").selectedIndex].id;
    http.onreadystatechange = function () {
        if(this.readyState==4 && this.status==200){
            alert("Deleted successfully!");
        }
        else{
            if(this.readyState==4 && this.status==404){
                alert("Cannot be deleted!");
            }
        }
    }
    http.open("DELETE", "http://localhost:5000/boards/"+ game.id);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();

}