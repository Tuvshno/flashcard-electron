import React, { useEffect, useState } from 'react';
import EditingCard from '../../components/EditingCard/EditingCard';
import '../../App.css';
import './EditingPage.css';
import Navigation from '../../components/Navigation/Navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { app } from '@electron/remote';

const fs = require('fs');
const path = require('path');

/**
 * EditingPage is the main component for managing a collection of flashcards.
 * It allows users to add, remove, and reorder cards, as well as to save the current set of cards.
 */
function EditingPage() {
  // Current list of cards
  const [cards, setCards] = useState<{ id: string, term: string, definition: string }[]>([{ id: '1', term: '', definition: '' }]);
  const [title, setTitle] = useState<string>()

  // Generates a unique ID for new cards
  const generateUniqueID = () => Date.now().toString();

  // Adds a new card to the list
  const addNewCard = () => {
    setCards((prevCards) => [...prevCards, { id: generateUniqueID(), term: '', definition: '' }]);
  };

  // Removes a card from the list by its ID
  const removeCard = (cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  // Reorders the cards when one is dragged and dropped to a new position
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex];
    setCards(prevCards => {
      const updatedCards = [...prevCards];
      updatedCards.splice(dragIndex, 1);
      updatedCards.splice(hoverIndex, 0, dragCard);
      return updatedCards;
    });
  };

  // Saves the current set of cards to a file
  const saveCards = () => {
    console.log("in ")
    const userDataPath = app.getPath('userData');
    const cardsDirectory = path.join(userDataPath, 'StudySets');
    if (!fs.existsSync(cardsDirectory)) {
      fs.mkdirSync(cardsDirectory, { recursive: true });
    }

    try {
      if (!title) {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filename = `savedCards-${timestamp}.json`;
        const filePath = path.join(cardsDirectory, filename);

        fs.writeFileSync(filePath, JSON.stringify(cards), 'utf-8');
        console.log(`wrote file to ${filePath}`)
      }
      else {
        const filename = `${title}.json`;
        const filePath = path.join(cardsDirectory, filename);

        fs.writeFileSync(filePath, JSON.stringify(cards), 'utf-8');
        console.log(`wrote file to ${filePath}`)
      }

    } catch (err) {
      console.error('Error writing to file:', err);
    }
  };

  // Updates the term of a specific card
  const handleUpdateTerm = (cardId: string, updatedTerm: string) => {
    setCards(prevCards => prevCards.map(card => card.id === cardId ? { ...card, term: updatedTerm } : card));
  };

  // Updates the definition of a specific card
  const handleUpdateDefinition = (cardId: string, updatedDefinition: string) => {
    setCards(prevCards => prevCards.map(card => card.id === cardId ? { ...card, definition: updatedDefinition } : card));
  };

  //Updates the title of the set
  const handleTitleUpdate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.textContent || '';
    setTitle(newTitle)
  };

  useEffect(() => {
    saveCards()
  }, [])

  return (
    <>
      <Navigation />
      <div className='ep-container'>
        <div className='ep-editable-box'
          contentEditable={true}
          role="textbox"
          aria-multiline="true"
          suppressContentEditableWarning={true}
          onKeyDown={handleTitleUpdate}>
        </div>
      </div>
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
