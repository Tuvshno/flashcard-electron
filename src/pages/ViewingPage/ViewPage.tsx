import React, { useState, useEffect, useRef } from 'react';
import Navigation from "../../components/Navigation/Navigation";
import './ViewingPage.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { Link, useParams } from 'react-router-dom';
import { app } from '@electron/remote';
import LandingCard from '../../components/LandingCard/LandingCard';

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
  const { studySetTitle } = useParams();

  // Loads saved cards from a file on component mount
  useEffect(() => {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, 'StudySets', `${studySetTitle}.json`);
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
    saveCards()
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

  const handleDeleteClick = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id)

    setCards(updatedCards);

    const userDataPath = app.getPath('userData');
    const cardsDirectory = path.join(userDataPath, 'StudySets');
    const filePath = path.join(cardsDirectory, `${studySetTitle}.json`);
    fs.writeFileSync(filePath, JSON.stringify(updatedCards), 'utf-8');

  }

  const saveCards = () => {
    const userDataPath = app.getPath('userData');
    const cardsDirectory = path.join(userDataPath, 'StudySets');
    const filePath = path.join(cardsDirectory, `${studySetTitle}.json`);
    fs.writeFileSync(filePath, JSON.stringify(cards), 'utf-8');

    console.log(filePath)
  }

  return (
    <>
      <Navigation />
      <div className='viewing-box'>
        <div className="viewing-container">
          <div className="viewing-title">
            {studySetTitle}
          </div>

          <div className='viewing-study-options'>
            <button>Flashcards</button>
            <button>Learn</button>
            <button>Test</button>
            <button>Match</button>
          </div>

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
                  <button onClick={() => handleDeleteClick(card.id)}>
                    <AiFillDelete className="viewing-edit" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button>Edit</button>
        </div>


      </div>
    </>
  );
}

export default ViewPage;
