import React from "react";
import DeckPreview from "./DeckPreview";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Home({decks, handleDeleteDeck}) {
    return (
        <div>
            <Link to="/">Home</Link>
            <hr/>
            <Link to="/decks/new">Create Deck</Link>
            {decks.map((deck) => (
                <div>
                    <DeckPreview deck={deck} handleDeleteDeck={handleDeleteDeck}/>
                    <hr/>
                </div>
            ))}
        </div>
    )
}

export default Home;