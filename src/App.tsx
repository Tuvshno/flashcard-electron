// App.tsx
import React, { useState } from 'react';
import EditingCard from './EditingCard';
import './App.css'

function App() {
  const [cards, setCards] = useState([{ number: 1 }]);

  const addCard = () => {
    setCards([...cards, { number: cards.length + 1 }]);
  };

  return (
    <div className='editing-card-container'>
      {cards.map((card, idx) => (
        <EditingCard
          key={idx}
          number={card.number}
          isLast={idx === cards.length - 1}
          onTabInLastCard={addCard} />
      ))}
    </div>
  );
}

export default App;
