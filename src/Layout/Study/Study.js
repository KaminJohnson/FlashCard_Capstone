import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Study() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({cards:[]});
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

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
    
    const handleNextClick = (event) => {
        const nextIndex = cardIndex+1;
        if(nextIndex === deck.cards.length) {
            if(window.confirm("Restart cards?")) {
                setCardIndex(0);
                setIsFlipped(false);
            } else {
                setCardIndex(0);
                history.push("/");
            } 
        } else {
            setCardIndex(nextIndex);
            setIsFlipped(false);
        }
    }

    return (
        <div>
            <Link to="/">Home / </Link>
            <Link to={`/decks/${deckId}`}>{deck.name} / </Link>
            <Link to={`/decks/${deckId}/study`}>Study</Link>
            <hr/>
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <div>
            {deck.cards.length >= 3 ? (
                <div>
                    <h2>Card {cardIndex+1} of {deck.cards.length}</h2>
                    {isFlipped ? (
                        <div>
                            <p>{deck.cards[cardIndex].back}</p>
                            <button onClick={handleNextClick}>Next</button>
                        </div>
                    ) : (
                        <div>{deck.cards[cardIndex].front}</div>
                    )}
                    <button onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
                </div>
            ) : (
                <NotEnoughCards deckId={deckId} cardCount={deck.cards.length}/>
            )}
            </div>
        </div>
    );
}

export default Study;