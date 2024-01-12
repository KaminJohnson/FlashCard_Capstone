import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "../Forms/CardForm";

function CreateCard() {
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

    const handleSubmit = (cardData) => {
        const abortController = new AbortController();
        createCard(deckId, cardData, abortController.signal)
        .then(() => {
            setDeck({...deck, cards: [...deck.cards, cardData]});
            
        })
        return () => abortController.abort();
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}/study`);
    }

    return (
        <div>
            <Link to="/">Home / </Link>
            <Link to={`/decks/${deckId}`}>{deck.name} / </Link>
            <Link to={`/decks/${deckId}/cards/new`}>Add Card</Link>
            <hr/>
            <h2>{deck.name}</h2>
            <CardForm handleSubmit={handleSubmit} setDeck={setDeck} handleDone={handleDone}/>
        </div>
    )
}

export default CreateCard;