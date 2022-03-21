let deckId;
let cardsLeft;
const computerScoreEl = document.getElementById("computer-score");
const yourScoreEl = document.getElementById("your-score");
let yourTotalScore = 0;
let computerTotalScore = 0;

document
	.getElementById("new-deck-btn")
	.addEventListener("click", async function () {
		const response = await fetch(
			"https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
		);
		const data = await response.json();
		deckId = data.deck_id;
		cardsLeft = data.remaining;
		document.getElementById("cards-remaining").textContent =
			cardsLeft + " cards remaining";
		document.getElementById("draw-cards-btn").disabled = false;
	});

document
	.getElementById("draw-cards-btn")
	.addEventListener("click", async function () {
		const response = await fetch(
			`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
		);
		const data = await response.json();
		for (let i = 0; i < data.cards.length; i++) {
			// added 1 to skip the first child since it is text
			document.getElementById("cards").children[i + 1].innerHTML = ` 
                            <img src="${data.cards[i].image}"/>
                        `;
		}
		const winnerText = cardWinner(data.cards[0], data.cards[1]);
		document.getElementById("header").innerText = winnerText;
		computerScoreEl.textContent = "Computer: " + computerTotalScore;
		yourScoreEl.textContent = "You: " + yourTotalScore;

		cardsLeft = data.remaining;
		document.getElementById("cards-remaining").textContent =
			cardsLeft + " cards remaining";

		if (cardsLeft <= 0) {
			document.getElementById("draw-cards-btn").disabled = true;
			endGame();
		}
	});

function cardWinner(card1, card2) {
	const valueOptions = [
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"JACK",
		"QUEEN",
		"KING",
		"ACE",
	];
	const card1ValueIndex = valueOptions.indexOf(card1.value);
	const card2ValueIndex = valueOptions.indexOf(card2.value);
	if (card1ValueIndex > card2ValueIndex) {
		computerTotalScore++;
		return "Computer Wins!";
	} else if (card1ValueIndex < card2ValueIndex) {
		yourTotalScore++;
		return "You Win!";
	} else return "It's a Draw!";
}

function endGame() {
	console.log("hello");
	let gameWinningPhrase = "";
	if (computerTotalScore > yourTotalScore) {
		gameWinningPhrase = "Computer Wins the Game!";
	} else if (computerTotalScore < yourTotalScore) {
		gameWinningPhrase = "You Win the Game!";
	} else gameWinningPhrase = "The Game is a Draw!";

	document.getElementById("header").innerText = gameWinningPhrase;
}
