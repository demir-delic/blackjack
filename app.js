(function () {

	let deck = [];

	let dealer = [];
	let player = [];

	let playButton = document.getElementById("play");
	let hitButton = document.getElementById("hit");	
	let standButton = document.getElementById("stand");
	let cards = document.getElementsByClassName("card");

	playButton.addEventListener("click", function() {
		playAgain();
		console.log("deal");
	});

	hitButton.addEventListener("click", function() {
		hit();
		console.log("hit");
	});

	standButton.addEventListener("click", function() {
		stand();
		console.log("stand");
	});

	function shuffle() {

        // Fisher–Yates Shuffle        
        // Source: https://bost.ocks.org/mike/shuffle/

        let array = [
            "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
            "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS",
            "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
            "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD"
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
		deck.splice(0, 4);
		
		cards[0].src = `/img/${dealer[0]}.png`;
		cards[2].src = `/img/${player[0]}.png`;
		cards[3].src = `/img/${player[1]}.png`;		

		console.log(`Player hand: ${player} \nDealer hand: ${dealer}`);

	 	// Calculate the hand values for both hands.
		let playerHandValue = getHandValue(player);
		let dealerHandValue = getHandValue(dealer);
		
		console.log(`Player hand value: ${playerHandValue} \nDealer hand value: ${dealerHandValue}`);

		// Call showWinner if either hand has a Blackjack.
		if(playerHandValue === dealerHandValue === 21)
		{
			showWinner("tie")
		}
		else if(playerHandValue === 21) {
			showWinner("player");
		}
		else if(dealerHandValue === 21) {
			showWinner("dealer");
		}

	}

	function hit() {
		// Add another card to the player hand.
		player.push(deck[0]);

		let img = document.createElement('img');
		img.classList.add("card", "temporary");
		img.src = `/img/${deck[0]}.png`;
		img.style = "display: inline-block";
		document.getElementById('player').appendChild(img);

		deck.splice(0, 1);
		
		// Calculate the player's hand value.
		let playerHandValue = getHandValue(player);
		
		console.log(`Player hand: ${player} \nPlayer hand value: ${playerHandValue}`);

		// If the value is greater than 21 call showWinner.
		if (playerHandValue > 21) { showWinner("dealer"); }
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

	function showWinner(winnerName) {
		// Display the hand winner.
		if(winnerName === "player") {
			console.log("You won!");
		}
		else if (winnerName === "dealer") {
			console.log("You lost!");
		}
		else {
			console.log("You tied!");
		}
		
		// Display the 'Play Again' button.
		playButton.innerHTML = "Play Again";
		playButton.style = "display: inline-block;"
		hitButton.style = "display: none";
		standButton.style = "display: none";
	}

	function playAgain() {
		// Clear the dealer and player hands.
		player = [];
		dealer = [];

		console.log(`Total cards in play: ${cards}`);
		let extraCards = document.getElementsByClassName("temporary");

		while(extraCards[0]) {
			extraCards[0].parentNode.removeChild(extraCards[0]);
		}

		for(i = 0; i < cards.length; i++) { cards[i].style = "display: inline-block"; }
		console.log(`Total cards in play: ${cards}`);
		
		playButton.style = "display: none;"
		hitButton.style = "display: inline-block";
		standButton.style = "display: inline-block";
		// Call the deal function.
		deal();
	}

})();