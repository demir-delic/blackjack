(function () {

	let deck = [];

	let dealer = [];
	let player = [];

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

		
		// Deal cards to the player and dealer.

		
	 	// Calculate the hand values for both hands.

		
		// Determine whether either hand has a Blackjack.

		
		// If either hand is a Blackjack call showWinner.

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

	function getHandValue() {
		// Return a numeric value for the cards in a hand.

	}

	function getCardValue() {
		// Return a numeric value for a single card.
	
	}

	function showWinner() {
		// Display the hand winner.
	
		
		// Display the 'Play Again' button.
	
	}

	function playAgain() {
		// Clear the dealer and player hands.
	
		
		// Call the deal function.
	
	}

})();