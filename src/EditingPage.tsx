import React, { useState } from 'react';
import EditingCard from './EditingCard';
import './App.css';
import './EditingPage.css';
import Navigation from './Navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { app } from '@electron/remote';

const fs = require('fs');
const path = require('path');

function EditingPage() {
  const [cards, setCards] = useState<{ id: string, term: string, definition: string }[]>([{ id: '1', term: '', definition: '' }]);

  const generateUniqueID = () => Date.now().toString();

  const addNewCard = () => {
    setCards((prevCards) => [...prevCards, { id: generateUniqueID(), term: '', definition: '' }]);
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

  const saveCards = () => {
    console.log('saving cards');

    // Define app-specific directory
    const userDataPath = app.getPath('userData');
    const cardsDirectory = path.join(userDataPath, 'StudySets');

    console.log("User Data Path:", userDataPath);
    console.log("Cards Directory:", cardsDirectory);

    if (!fs.existsSync(cardsDirectory)) {
      fs.mkdirSync(cardsDirectory, { recursive: true });
    }

    if (!fs.existsSync(cardsDirectory)) {
      console.error("Directory failed to create for some reason");
      return;
    }

    const timestamp = new Date().toISOString();
    const filename = `savedCards-${timestamp}.json`;
    const filePath = path.join(cardsDirectory, filename);

    try {
      fs.writeFileSync(filePath, JSON.stringify(cards), 'utf-8');
      console.log(`Cards saved to ${filePath}`);
    } catch (err) {
      console.error('Error writing to file:', err);
    }
  };

  const handleUpdateTerm = (cardId: string, updatedTerm: string) => {
    setCards(prevCards => prevCards.map(card => card.id === cardId ? { ...card, term: updatedTerm } : card));
  };

  const handleUpdateDefinition = (cardId: string, updatedDefinition: string) => {
    setCards(prevCards => prevCards.map(card => card.id === cardId ? { ...card, definition: updatedDefinition } : card));
  };

  return (
    <>
      <Navigation />
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
              term={card.term}
              definition={card.definition}
              onUpdateTerm={(updatedTerm) => handleUpdateTerm(card.id, updatedTerm)}
              onUpdateDefinition={(updatedDefinition) => handleUpdateDefinition(card.id, updatedDefinition)}
            />
          ))}
          <div className="ec-container ec-add-card" onClick={addNewCard}>
            <p>+ ADD CARD</p>
          </div>
        </div>
      </DndProvider>

      <button className='editing-create-button' onClick={saveCards}>Create</button>
    </>
  );
}

export default EditingPage;
