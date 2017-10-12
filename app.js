(function () {

	let deck = [];

	let dealer = [];
	let player = [];

	let playButton = document.getElementById("play");
	let hitButton = document.getElementById("hit");	
	let standButton = document.getElementById("stand");
	let cards = document.getElementsByClassName("card");
	let winner = document.getElementById("winner");
	let introDiv = document.getElementById("introDiv");

	playButton.addEventListener("click", function() {
		playAgain();
	});

	hitButton.addEventListener("click", function() {
		hit(player, "playerCardsDiv");
	});

	standButton.addEventListener("click", function() {
		stand();
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
		
		cards[0].src = `img/${dealer[0]}.png`;
		cards[2].src = `img/${player[0]}.png`;
		cards[3].src = `img/${player[1]}.png`;

		console.log(`Dealer hand: ${dealer} \nPlayer hand: ${player}`);

	 	// Calculate the hand values for both hands.
		let dealerHandValue = getHandValue(dealer);
		let playerHandValue = getHandValue(player);
		
		console.log(`Dealer hand value: ${dealerHandValue} \nPlayer hand value: ${playerHandValue}`);

		// Call showWinner if player has a Blackjack.
		if (playerHandValue === 21) { showWinner(); }
	}

	function hit(hand, div) {
		// Add another card to the player hand.
		hand.push(deck[0]);

		let img = document.createElement("img");
		img.classList.add("card", "temp");
		img.src = `img/${deck[0]}.png`;
		img.style = "display: inline-block";
		document.getElementById(div).appendChild(img);

		deck.splice(0, 1);
		
		// Calculate the player's hand value.
		let handValue = getHandValue(hand);
		
		console.log(`Hand: ${hand} \nHand value: ${handValue}`);	

		// If the value is greater than 21 call showWinner.
		if(handValue >= 21) { showWinner(); }
	}

	function stand() {
		// Show the dealer's second card.
		cards[1].src = `img/${dealer[1]}.png`;
		
		// The dealer must hit on 16 or less.
		// If dealer hits, deal another card and calculate total.
		let dealerHandValue = getHandValue(dealer);

		while(dealerHandValue < 17) {
			hit(dealer, "dealerCardsDiv");
			dealerHandValue = getHandValue(dealer);
		}
		
		// When the dealer stands (total is over 16 and under 22) determine winner or push and end the hand.
		showWinner();
	}

	function getHandValue(hand) {
		// Create separate arrays for aces and non-aces.
		var handValue = 0;
		let aces = hand.filter(card => { return (card.charAt(0) === "A"); });

		//console.log(`Aces array length: ${aces.length} \nAces array contents: ${aces}`);

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
		cards[1].src = `img/${dealer[1]}.png`;		
		
		let dealerHandValue = getHandValue(dealer);
		let playerHandValue = getHandValue(player);
		
		if (dealerHandValue === playerHandValue) {
			winner.textContent = "Push - hands are equal in value";
			winnerDiv.classList.add("alert-warning");							
		}
		else if (playerHandValue > dealerHandValue) {
			if(playerHandValue === 21) {
				winner.textContent = "Win - you have Blackjack";
				winnerDiv.classList.add("alert-success");				
			}
			else if(playerHandValue > 21) {
				winner.textContent = "Loss - you busted";
				winnerDiv.classList.add("alert-danger");				
			}
			else {
				winner.textContent = "Win - your hand is better than dealer's";
				winnerDiv.classList.add("alert-success");				
			}
		}
		else {
			if(dealerHandValue === 21) {
				winner.textContent = "Loss - dealer has Blackjack";
				winnerDiv.classList.add("alert-danger");								
			}
			else if(dealerHandValue > 21) {
				winner.textContent = "Win - dealer busted";
				winnerDiv.classList.add("alert-success");
			}
			else {
				winner.textContent = "Loss - dealer's hand is better than yours";
				winnerDiv.classList.add("alert-danger");								
			}
		}
		
		// Display the 'Play Again' button.
		playButton.textContent = "Play Again";
		playButton.classList.remove("hidden");
		hitButton.classList.add("hidden");
		standButton.classList.add("hidden");
	}

	function playAgain() {
		// Clear the dealer and player hands.
		player = [];
		dealer = [];

		winner.textContent = "";
		winnerDiv.classList.remove("alert-success");											
		winnerDiv.classList.remove("alert-warning");
		winnerDiv.classList.remove("alert-danger");		

		cards[1].src = `img/back.png`;

		introDiv.style = "position: initial; top: initial; left: initial; transform: initial;"
		
		// Remove all <img>s other than the original four
		//console.log(`Total cards in play: ${cards}`);
		let extraCards = document.getElementsByClassName("temp");

		while(extraCards[0]) {
			extraCards[0].parentNode.removeChild(extraCards[0]);
		}

		for(i = 0; i < cards.length; i++) { cards[i].style = "display: inline-block"; }
		//console.log(`Total cards in play: ${cards}`);
		
		playButton.classList.add("hidden");
		hitButton.classList.remove("hidden");
		standButton.classList.remove("hidden");
		dealerCardsDiv.classList.remove("hidden");
		playerCardsDiv.classList.remove("hidden");

		// Call the deal function.
		deal();
	}

	/*function calcViewportHeight {
		
	}*/

})();