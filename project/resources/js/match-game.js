var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
	var cards = MatchGame.generateCardValues();
	MatchGame.renderCards(cards, $('#game'));
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
	var orderedCards = [];
	for (var i = 1; i <= 8; i++) {
		orderedCards.push(i);
		orderedCards.push(i);
	}
	var randomCards = [];

	while (orderedCards.length != 0) {
		var randomIndex = Math.floor(Math.random() * orderedCards.length);
		randomCards.push(orderedCards[randomIndex]);
		orderedCards.splice(randomIndex, 1);
	}
	return randomCards;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	var colors = ['hsl(25, 85%, 65%)',
					'hsl(55, 85%, 65%)',
					'hsl(90, 85%, 65%)',
					'hsl(160, 85%, 65%)',
					'hsl(220, 85%, 65%)',
					'hsl(265, 85%, 65%)',
					'hsl(310, 85%, 65%)',
					'hsl(360, 85%, 65%)'];
	
	$game.empty();
	$game.data('cardsFlipped', []);

	for (var i = 0; i < cardValues.length; i++) {
		var cardNumber = cardValues[i];
		var cardColor = colors[cardNumber - 1];
		var cardData = {
			value: cardNumber,
			color: cardColor,
			flipped: false
		};

		var $card = $('<div class="card col-xs-3"></div>');
		$card.data(cardData);

		$game.append($card);
	}

	$('.card').click(function() {
    	MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
	if ($card.data('flipped') == true) {
		return;
	}

	$card.css("background-color", $card.data('color'));
	$card.text($card.data('value'));
	$card.data('flipped', true);

	var flippedCards = $game.data('cardsFlipped');
	flippedCards.push($card);

	if (flippedCards.length === 2) {
		if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
			flippedCards[0].css("background-color", 'rgb(153, 153, 153');
			flippedCards[0].css("color", 'rgb(204, 204, 204');
			flippedCards[1].css("background-color", 'rgb(153, 153, 153');
			flippedCards[1].css("color", 'rgb(204, 204, 204');
		} else {
			window.setTimeout(function () {
				flippedCards[0].css("background-color", 'rgb(32, 64, 86');
				flippedCards[1].css("background-color", 'rgb(32, 64, 86');
				flippedCards[0].text('');
				flippedCards[1].text('');
				flippedCards[0].data('flipped', false);
				flippedCards[1].data('flipped', false);
			}, 400);
		}
		$game.data('cardsFlipped', []);
	}

	//flippedCards=[];
};