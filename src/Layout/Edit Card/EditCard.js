import React, { useEffect, useState }  from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "../Forms/CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({cards:[]});
    const [card, setCard] = useState({});

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
    
    useEffect(() => {
        const abortController = new AbortController();
        const fetchCard = async () => {
            try {
                const fetchedCard = await readCard(cardId, abortController.signal);
                setCard(fetchedCard);
            } catch(error) {
                console.error(`Error fetching card: ${cardId}`, error);
            }
        }
        fetchCard();
        return () => abortController.abort();
    }, [cardId]);


    const handleSubmit = (updatedCard) => {
        const abortController = new AbortController();
        updateCard({front: updatedCard.front, back: updatedCard.back, id: cardId, deckId: parseInt(deckId)}, abortController.signal)
            .then(() => {
                history.push(`/decks/${deckId}`);
            });
        return () => abortController.abort();
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <Link to="/">Home / </Link>
            <Link to={`/decks/${deckId}`}>{deck.name} / </Link>
            <Link to={`/decks/${deckId}/cards/${cardId}/edit`}>Edit Card {cardId}</Link>
            <hr/>
            <h2>Edit Card</h2>
            <CardForm handleSubmit={handleSubmit} handleDone={handleDone} initialFront={card.front} initialBack={card.back}/>
        </div>
    )
}

export default EditCard;