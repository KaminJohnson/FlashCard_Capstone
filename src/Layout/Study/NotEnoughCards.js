import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({deckId, cardCount}) {
  return (
    <div className="NotEnoughCards">
      <h1>Not Enough Cards</h1>
      <p>You need at least 3 cards to study. There are {cardCount} cards in this deck.</p>
      <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
    </div>
  );
}

export default NotEnoughCards;
