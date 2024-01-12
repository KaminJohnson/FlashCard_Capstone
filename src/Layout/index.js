import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import { createDeck, deleteDeck, listDecks } from "../utils/api";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import Study from "./Study/Study";
import CreateDeck from "./CreateDeck/CreateDeck";
import CreateCard from "./CreateCard/CreateCard";
import DeckView from "./DeckView/DeckView";
import EditDeck from "./EditDeck/EditDeck";
import EditCard from "./Edit Card/EditCard";

function Layout() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchDeck = async () => {
      try {
        const fetchedDecks = await listDecks(abortController.signal);
        setDecks(fetchedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };
    fetchDeck();
    return () => {abortController.abort();};
  }, []);
  
  function handleCreateDeck(deck) {
    const abortController = new AbortController();
    const fetchDeckCreation = async () => {
      try {
        await createDeck(deck, abortController.signal);
        const newId = decks.length +1;
        setDecks((currentDecks) => [...currentDecks, {...deck, id: newId}]);
        history.push(`/decks/${newId}/study`);
      } catch (error) {
        console.error(`Error deleting deck:`, error);
      }
    };
    fetchDeckCreation();
    return () => abortController.abort();
  };

  function handleDeleteDeck(deckId) {
    const abortController = new AbortController();
    deleteDeck(deckId)
      .then(() => {
        const filteredDeck = decks.filter((deck) => deck.id !== deckId);
        setDecks(filteredDeck);
      })
      return() => abortController.abort();
  }

  function handleUpdateDecks() {
    const abortController = new AbortController();
    const fetchDeck = async () => {
      try {
        const fetchedDecks = await listDecks(abortController.signal);
        setDecks(fetchedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };
    fetchDeck();
    return () => {abortController.abort();};
  }

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} handleDeleteDeck={handleDeleteDeck}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck handleCreateDeck={handleCreateDeck}/>
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView handleDeleteDeck={handleDeleteDeck} />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck handleUpdateDecks={handleUpdateDecks} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study decks={decks}/>
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CreateCard/>
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
