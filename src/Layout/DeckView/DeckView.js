import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api";

function DeckView({ handleDeleteDeck }) {
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

    function onDeleteDeck(deckId) {
        if(window.confirm('Delete this deck?\nYou will not be able to recover it.')) {
            handleDeleteDeck(deckId);
            history.push("/");
        }
    }

    function onDeleteCard(cardId) {
        if(window.confirm('Delete this card?\nYou will not be able to recover it.')) {
            const abortController = new AbortController();
            const fetchDeletion = async() => {
                try{ 
                    await deleteCard(cardId, abortController.signal);
                } catch (error) {
                    console.error(`Error deleting card: ${cardId}`, error);
                }
            }
            fetchDeletion();
            history.go(0);
            return () => abortController.abort();
        }
    }

    return (
        <div>
            <Link to="/">Home / </Link>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            <hr/>
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <div>
                <Link to={`/decks/${deckId}/edit`}>Edit </Link>
                <Link to={`/decks/${deckId}/study`}>Study </Link>
                <Link to={`/decks/${deckId}/cards/new`}>Add Cards </Link>
                <button onClick={() => onDeleteDeck(deckId)}>Delete</button>
                <hr/>
            </div>
            <h2>Cards</h2>
            {deck.cards.map((card, index) => (
                <div>
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit </Link>
                    <button onClick={() => onDeleteCard(card.id)}>Delete</button>
                    <hr/>
                </div>
            ))}
        </div>
    )
}

export default DeckView;