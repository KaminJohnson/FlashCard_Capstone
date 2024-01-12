import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import DeckForm from "../Forms/DeckForm";

function CreateDeck({handleCreateDeck}) {
    const history = useHistory();

    const handleSubmit = (deckData) => {
        handleCreateDeck(deckData);
    }

    function handleCancel() {
        history.push("/");
    }

    return (
        <div>
            <Link to="/">Home / </Link>
            <Link to={`/decks/new`}>New Deck</Link>
            <hr/>
            <h1>Create Deck</h1>
            <DeckForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    )
}

export default CreateDeck;