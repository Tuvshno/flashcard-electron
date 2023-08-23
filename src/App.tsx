import React, { useState, useRef, useEffect } from 'react';
import EditingCard from './EditingCard';
import './App.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [cards, setCards] = useState<{ id: string, value: number }[]>([{ id: '1', value: 1 }]);
  const lastCardRef = useRef<HTMLDivElement>(null);

  const generateUniqueID = () => Date.now().toString();

  const addNewCard = () => {
    setCards((prevCards) => [...prevCards, { id: generateUniqueID(), value: prevCards.length + 1 }]);
  };

  const removeCard = (cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex];
    setCards(prevCards => {
      const updatedCards = [...prevCards];
      updatedCards.splice(dragIndex, 1);
      updatedCards.splice(hoverIndex, 0, dragCard);
      return updatedCards;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      lastCardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, [cards]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='editing-card-container'>
        {cards.map((card, index) => (
          <EditingCard
            key={card.id}
            number={index + 1}
            isNewest={index === cards.length - 1}
            isLast={index === cards.length - 1}
            onTabInLastCard={addNewCard}
            onRemoveCard={() => removeCard(card.id)}
            index={index}
            moveCard={moveCard}
          />
        ))}
        <div ref={lastCardRef}></div>
        <div className="ec-container ec-add-card" onClick={addNewCard}>
          <p>+ ADD CARD</p>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
