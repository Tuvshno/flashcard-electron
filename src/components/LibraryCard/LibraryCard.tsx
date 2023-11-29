import React from 'react';
import './LibraryCard.css'; // Assuming you have a separate CSS file for this component

interface LibraryCardProps {
  title : String;
}

const LibraryCard = ({ title } : LibraryCardProps) => {
  return (
    <div className="libraryCardContainer">
      <div className="libraryCardContent">
        <div className="libraryCardTitle">{title}</div>
      </div>
    </div>
  );
};

export default LibraryCard;