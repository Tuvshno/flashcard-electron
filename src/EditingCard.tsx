import React, { useRef, useImperativeHandle, useEffect } from 'react';
import { PiTrashSimpleLight } from 'react-icons/pi';
import { HiMiniBars2 } from 'react-icons/hi2';
import './EditingCard.css'


function setFocusAtEnd(e: React.FocusEvent<HTMLDivElement>) {
  const contentEditableElement = e.currentTarget;
  const range = document.createRange();
  const selection = window.getSelection();

  if (!selection) return;

  if (contentEditableElement.lastChild && contentEditableElement.lastChild.textContent) {
    range.setStart(contentEditableElement.lastChild as Node, contentEditableElement.lastChild.textContent.length);
  } else {
    range.setStart(contentEditableElement, 0);
  }

  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

type EditingCardProps = {
  number: number;
  isLast?: boolean;
  isNewest?: boolean;
  onTabInLastCard?: () => void;
  onRemoveCard?: () => void;  
};

function EditingCard({ number, isLast, onTabInLastCard, isNewest, onRemoveCard  }: EditingCardProps) {

  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNewest) {
      editableRef.current?.focus();
    }
  }, [isNewest]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isLast && e.key === 'Tab') {
      e.preventDefault();
      onTabInLastCard && onTabInLastCard();
    }
  };
  return (
    <>

      <div className="ec-container">
        <div className='ec-toolbar'>
          <h4>{number}</h4>
          <div>
            <button tabIndex={-1}><HiMiniBars2 /></button>
            <button tabIndex={-1} onClick={onRemoveCard} ><PiTrashSimpleLight /></button>
          </div>
        </div>

        <div className='ec-info-container'>

          <div className='ec-term-container'>
            <div
              ref={editableRef}
              className="editable-box"
              contentEditable={true}
              role="textbox"
              aria-multiline="true"
              onFocus={setFocusAtEnd}

            >
            </div>
            <div className='ec-info'>
              <h5 id='info-term'>TERM</h5>
              <h5>ENGLISH</h5>
            </div>
          </div>

          <div className='ec-term-container'>
            <div
              className="editable-box"
              contentEditable={true}
              role="textbox"
              aria-multiline="true"
              onFocus={setFocusAtEnd}
              onKeyDown={handleKeyDown}

            >
            </div>
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

export default EditingCard