import React, { useRef, useEffect } from 'react';
import { PiTrashSimpleLight } from 'react-icons/pi';
import { HiMiniBars2 } from 'react-icons/hi2';
import './EditingCard.css';
import { useDrag, useDrop } from 'react-dnd';

/**
 * Component to render and manage an individual flashcard.
 * Allows editing of term and definition, reordering, and deletion.
 */

type EditingCardProps = {
  number: number;
  isLast?: boolean;
  isNewest?: boolean;
  onTabInLastCard?: () => void;
  onRemoveCard?: () => void;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  term: string;
  definition: string;
  onUpdateTerm: (term: string) => void;
  onUpdateDefinition: (definition: string) => void;
};


function EditingCard({
  number, isLast, onTabInLastCard, isNewest, onRemoveCard, index, moveCard, term, definition, onUpdateTerm, onUpdateDefinition
}: EditingCardProps) {

  const editableRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const hasFocused = useRef(false);
  const definitionRef = useRef<HTMLDivElement>(null);

  // Function to set the focus at the end of a contentEditable element
  function setFocusAtEnd(e: React.FocusEvent<HTMLDivElement>) {
    const contentEditableElement = e.currentTarget;
    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) return;
    
    // Logic to set the caret position
    if (contentEditableElement.lastChild && contentEditableElement.lastChild.textContent) {
      range.setStart(contentEditableElement.lastChild as Node, contentEditableElement.lastChild.textContent.length);
    } else {
      range.setStart(contentEditableElement, 0);
    }
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Scroll the newest card into view
  useEffect(() => {
    if (isNewest) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isNewest]);
  
  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item: { type: string; index: number }) => {
      if (item.index === index) return;

      moveCard(item.index, index);
      item.index = index;  
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  // Handle keydown events for tab navigation and other shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab' && !e.shiftKey && isLast && document.activeElement === definitionRef.current) {
      e.preventDefault();
      onTabInLastCard && onTabInLastCard();
    }
  };
  
  //Automatic Focus on the New Card
  useEffect(() => {
    if (isNewest && !hasFocused.current) {
      editableRef.current?.focus();
      hasFocused.current = true;
    }
    else if (!isNewest) {
      hasFocused.current = false;
    }
  }, [isNewest]);


  return (
    <>
      <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="ec-container">
        <div className='ec-toolbar'>
          <h4>{number}</h4>
          <div>
            <button tabIndex={-1}><HiMiniBars2 /></button>
            <button tabIndex={-1} onClick={onRemoveCard} ><PiTrashSimpleLight /></button>
          </div>
        </div>

        <div className='ec-info-container'>
          {/* Term input */}
          <div className='ec-term-container'>
            <div
              ref={editableRef}
              className="editable-box"
              contentEditable={true}
              role="textbox"
              aria-multiline="true"
              suppressContentEditableWarning={true}
              onFocus={setFocusAtEnd}
              onBlur={(e) => onUpdateTerm(e.currentTarget.textContent || '')}
              onKeyDown={handleKeyDown}
            ></div>
            <div className='ec-info'>
              <h5 id='info-term'>TERM</h5>
              <h5>ENGLISH</h5>
            </div>
          </div>

          {/* Definition input */}
          <div className='ec-term-container'>
            <div
            ref={definitionRef} 
              className="editable-box"
              contentEditable={true}
              role="textbox"
              aria-multiline="true"
              suppressContentEditableWarning={true}
              onFocus={setFocusAtEnd}
              onKeyDown={handleKeyDown}
              onBlur={(e) => onUpdateDefinition(e.currentTarget.textContent || '')}
            ></div>
            <div className='ec-info'>
              <h5>DEFINITION</h5>
              <h5>ENGLISH</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditingCard;
