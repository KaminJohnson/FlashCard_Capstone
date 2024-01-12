import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "../Forms/DeckForm";

function EditDeck({ handleUpdateDecks }) {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({cards:[]});

    useEffect(() => {
        const abortController = new AbortController();
        const fetchDeck = async () => {
            try {
                const fetchedDeck = await readDeck(deckId, abortController.signal);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error(`Error fetching deck: ${deckId}`, error);
            }
        };
        fetchDeck();
        return () => abortController.abort();
    }, [deckId]);

    const handleSubmit = (deckData) => {
        setDeck({...deck, name: deckData.name, description: deckData.description});
        const abortController = new AbortController();
        updateDeck({...deck, name: deckData.name, description: deckData.description}, abortController.signal);
        handleUpdateDecks();
        return () => abortController.abort();
    }

    const handleCancel = () => {
        history.push(`/decks/${deckId}/`);
    }

    return (
        <div>
            <Link to="/">Home / </Link>
            <Link to={`/decks/${deckId}`}>{deck.name} / </Link>
            <Link to={`/decks/${deckId}/edit`}>Edit Deck</Link>
            <hr/>
            <h2>Edit Deck</h2>            
            <DeckForm handleSubmit={handleSubmit} handleCancel={handleCancel} initialName={deck.name} initialDescription={deck.description}/>
        </div>
    )
}

export default EditDeck;