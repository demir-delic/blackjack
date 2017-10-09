(function () {

	let deck = [];

	let dealer = [];
	let player = [];

	let play = document.getElementById("play");

	play.addEventListener('click', function() {
		deal();
		console.log("click");
	});

	function shuffle() {

        // Fisher–Yates Shuffle        
        // Source: https://bost.ocks.org/mike/shuffle/

        let array = [
            '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
            '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
            '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
            '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
        ];
    
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
		
        return array;
	}
	
	function deal() {
		// Call the shuffle function.
		deck = shuffle();
		
		// Deal cards to the player and dealer.
		player.push(deck[0], deck[2]);
		dealer.push(deck[1], deck[3]);
		
		console.log(`Player deck: ${player} \nDealer deck: ${dealer}`);

	 	// Calculate the hand values for both hands.
		let playerHandValue = getHandValue(player);
		let dealerHandValue = getHandValue(dealer);
		
		console.log(`Player hand value: ${playerHandValue} \nDealer hand value: ${dealerHandValue}`);

		// Call showWinner if either hand has a Blackjack.
		if(playerHandValue === 21) {
			showWinner();
		}
		else if(dealerHandValue === 21) {
			showWinner();
		}

	}

	function hit() {
		// Add another card to the player hand.

		
		// Calculate the player's hand value.

		
		// If the value is greater than 21 call showWinner.

	}

	function stand() {
		// Enter the dealer hit phase.

		
		// The dealer must hit on 16 or less.
		
		
		// If dealer hits, deal another card and calculate total. End hand if the dealer busts.
		
		
		// When the dealer stands (total is over 16 and under 22) determine winner or push and end the hand.

	}

	function getHandValue(hand) {
		// Create separate arrays for aces and non-aces.
		var handValue = 0;
		let aces = hand.filter(card => { return (card.charAt(0) === "A"); });

		console.log(`Aces array length: ${aces.length} \nAces array contents: ${aces}`);

		// Return a numeric value for the cards in a hand.
		hand.forEach(card => {
			handValue += getCardValue(card);
		});

		// Reduce an ace's value to 1 if the hand would be over 21 otherwise
		if(aces.length !== 0) {
			aces.forEach(card => {
				if(handValue > 21) {
					handValue -= 10;
				}
			});
		}

		return handValue;
	}

	function getCardValue(card) {
		// Return a numeric value for a single card.
		let cardValue = 0;
		card = card.slice(0, -1); // Remove the card's suit
		
		if(card === "J" || card === "Q" || card === "K") {
			cardValue += 10;
		}
		else if(card === "A") {
			cardValue += 11; // Alternate case is dealt with in getHandValue
		}
		else {
			cardValue += Number(card);
		}

		return cardValue;
	}

	function showWinner() {
		// Display the hand winner.
		console.log("Someone won!")
		
		// Display the 'Play Again' button.
	
	}

	function playAgain() {
		// Clear the dealer and player hands.
		player = [];
		dealer = [];
		
		// Call the deal function.
		deal();
	}

})();