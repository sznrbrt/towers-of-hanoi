"use strict";

var Game = {
  towers: 3,
  init: function () {
    Game.newGame();
  },
  newGame: function(){
    // Create piles and append to DOM
    var $pile1 = $('<div id="pile1" class="pile"></div>');
    var $pile2 = $('<div id="pile2" class="pile"></div>');
    var $pile3 = $('<div id="pile3" class="pile"></div>');
    // jQuery way to do it
    // var $pile1 = $('<div>').text('').addClass('pile');

    var $piles = $().add($pile1).add($pile2).add($pile3);
    $('#tower1').append($piles);
    $('#messageBoard').empty();

    // Click eventhandlers for the towers
    $('.tower').click(Game.touchPile);

    // Clear playGround if the game was restarted
    $('#tower3').empty();
    // Add towerLines after emptying
      var $line = $('<div class="towerLine"></div>');
      for(var i = 1; i <= Game.towers; i++){
        var $tower = $('#' + i);
        $tower.append($line);
      }
  },
  touchPile: function(e){
    if(Game.grabedPile === 0){
      Game.grabPile(this);
    } else {
      Game.movePile(this);
    }
  },
  grabedPile: 0,
  grabPile: function(tower) {
    $('.selected').removeClass('selected')
    // Find the top pile
    var topPile = tower.querySelector(".pile:first-of-type");
    if(topPile === null){
      Game.grabedPile = 0;
    } else {
      Game.grabedPile = topPile;
      // add selected effect
      $('#' + Game.grabedPile.id).addClass('selected');
    }
  },
  movePile: function(targetTower){
    // Select target tower
    var targetID = targetTower.querySelector(".pileHolder").id;
    // Check if the move is illegal, if so block the move
    var grabedWidth = $('#' + Game.grabedPile.id).css('width');
    var targetTopPile = $('#' + targetID).children()[0];
    var targetTopPileID;
    var targetTopPileWidth;
    if(targetTopPile !== undefined) targetTopPileID = targetTopPile.id;
    if(targetTopPile !== undefined) targetTopPileWidth = $('#' + targetTopPileID).css("width");

    if(pixelToNumber(grabedWidth) > pixelToNumber(targetTopPileWidth)) {
      Game.grabedPile = 0;
      return;
    }
    // Move pile to target
    $('#' + targetID).prepend(Game.grabedPile);
    $('#' + Game.grabedPile.id).removeClass('selected');
    // Clear the chace for the grabedPile
    Game.grabedPile = 0;
    // Check if won
    if(Game.hasWon()){
      var $winnerMessage = $("<h2>Congratulation! You\'ve won the game!</h2>");
      var $replayButton = $('<button id="replay">Start a new game</button>');
      $('#messageBoard').append($winnerMessage).append($replayButton);
      $('#replay').click(Game.newGame);
      $('.tower').off();
    }
  },
  hasWon: function (){
    var $thirdTower = $('#tower3').children();
    if($thirdTower.length === 3) return true;
    else return false;
  },
}

$(document).ready(Game.init);

function pixelToNumber(pix){
  return parseInt(pix);
}
