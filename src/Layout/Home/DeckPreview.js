import React from "react";
import { Link } from "react-router-dom";

function DeckPreview({deck, handleDeleteDeck}) {

    function handleDelete(deckId) {
        if(window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
            handleDeleteDeck(deckId);
        }
    }

    return (
        <div>
            {deck != {} ? (
                <div>
                    <h2>{deck.name}</h2>
                    <p>{deck.description}</p>
                    <p>{deck.cards ? deck.cards.length : 0} cards</p>
                    <div>
                        <Link to={`/decks/${deck.id}`}><button>View</button></Link>
                        <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
                        <button onClick={() => handleDelete(deck.id)}>Delete</button>
                    </div>
                </div>
            ) : null }
        </div>
    )
}

export default DeckPreview;