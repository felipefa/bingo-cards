import React, { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';

import BingoCard from '../../components/BingoCard';

import './styles.scss';

const DEFAULT_CARD = [nanoid()];

const Home = () => {
  const [cardIds, setCardIds] = useState(DEFAULT_CARD);

  const handleAddCard = useCallback(() => {
    setCardIds((oldState) => {
      const newCardIds = [...oldState];
      newCardIds.push(nanoid());
      return newCardIds;
    });
  }, []);

  const handleRemoveLastCard = useCallback(() => {
    setCardIds((oldState) => {
      const newCardIds = [...oldState];
      newCardIds.pop();
      return newCardIds;
    });
  }, []);

  return (
    <div className="home">
      <h1>Hora do Bingo</h1>
      <div className="cards-amount-container">
        <button
          disabled={cardIds.length === 1}
          onClick={handleRemoveLastCard}
          type="button"
        >
          -
        </button>
        <p>Qtd. de cartelas: {cardIds.length}</p>
        <button
          disabled={cardIds.length === 6}
          onClick={handleAddCard}
          type="button"
        >
          +
        </button>
      </div>
      <div className="card-container">
        {cardIds.map((cardId) => (
          <BingoCard key={cardId} />
        ))}
      </div>
      <footer>
        <small>
          <a
            href="https://felipefa.now.sh"
            rel="noopener noreferrer"
            target="_blank"
          >
            Felipe Araujo
          </a>
          , 2020
        </small>
      </footer>
    </div>
  );
};

export default Home;
