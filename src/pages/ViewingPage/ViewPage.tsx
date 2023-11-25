import React, { useState, useEffect, useRef } from 'react';
import Navigation from "../../components/Navigation/Navigation";
import './ViewingPage.css';
import { AiFillEdit } from 'react-icons/ai';

const fs = window.require('fs');
const path = window.require('path');

export interface Card {
  id: number;
  term: string;
  definition: string;
}

/**
 * ViewPage is a component for displaying and editing a list of flashcards.
 * It allows users to view saved cards and make edits to them.
 */
const ViewPage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [editableCardId, setEditableCardId] = useState<number | null>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const definitionRef = useRef<HTMLDivElement>(null);

  // Loads saved cards from a file on component mount
  useEffect(() => {
    const filePath = path.join(window.require('os').homedir(), 'savedCards.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const savedCards: Card[] = JSON.parse(fileContent);
      setCards(savedCards);
    }
  }, []);

  /**
   * Saves the updates made to a card.
   * @param id The id of the card to be saved.
   */
  const saveUpdatedCard = (id: number) => {
    const updatedTerm = termRef.current?.innerText;
    const updatedDefinition = definitionRef.current?.innerText;

    const updatedCards = cards.map(card => {
      if (card.id === id) {
        return {
          ...card,
          term: updatedTerm || card.term,
          definition: updatedDefinition || card.definition,
        };
      }
      return card;
    });

    setCards(updatedCards);

    // Save updated cards to file
    const filePath = path.join(window.require('os').homedir(), 'savedCards.json');
    fs.writeFileSync(filePath, JSON.stringify(updatedCards), 'utf-8');
  };

  /**
   * Handles the click event on the edit button of a card.
   * Enables editing if clicked once and saves the card if clicked again.
   * @param id The id of the card being edited.
   */
  const handleEditClick = (id: number) => {
    if (editableCardId === id) {
      setEditableCardId(null);  // Toggle off
      saveUpdatedCard(id);      // Save the card after editing
    } else {
      setEditableCardId(id);    // Toggle on
    }
  };

  return (
    <>
      <Navigation />
      <div className="viewing-container">
        {cards.map(card => (
          <div key={card.id} className="card">
            <div className="card-content">
              <div className="term">
                {editableCardId === card.id ?
                  <div ref={termRef} contentEditable={true} className="editable-box">{card.term}</div> :
                  <div className="editable-box-view">{card.term}</div>}
              </div>
              <div className="definition">
                {editableCardId === card.id ?
                  <div ref={definitionRef} contentEditable={true} className="editable-box">{card.definition}</div> :
                  <div className="editable-box-view">{card.definition}</div>}
              </div>
              <div className='buttons'>
                <button onClick={() => handleEditClick(card.id)}>
                  <AiFillEdit className="viewing-edit" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewPage;
