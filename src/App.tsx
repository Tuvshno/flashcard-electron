// App.tsx
import React, { useState, useRef, useEffect } from 'react';
import EditingCard from './EditingCard';
import './App.css'

function App() {
  const [cards, setCards] = useState<number[]>([1]);
  const lastCardRef = useRef<HTMLDivElement>(null);

  const addNewCard = () => {
    setCards((prevCards) => [...prevCards, prevCards.length + 1]);
  };

  const removeCard = (cardNumber: number) => {
    setCards(prevCards => prevCards.filter(card => card !== cardNumber));
  };

  useEffect(() => {
    setTimeout(() => {
      lastCardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, [cards]);

  return (
    <div className='editing-card-container'>
      {cards.map((number, index) => (
        <EditingCard
          key={index}
          number={index + 1}
          isNewest={index === cards.length - 1}
          isLast={index === cards.length - 1}
          onTabInLastCard={addNewCard}
          onRemoveCard={() => removeCard(number)}
        />
      ))}
      <div ref={lastCardRef}></div>
      <div className="ec-container ec-add-card" onClick={addNewCard}>
        <p>+ ADD CARD</p>
      </div>

    </div>
  );
}

export default App;