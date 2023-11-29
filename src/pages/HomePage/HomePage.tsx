import { Link } from "react-router-dom";

import LandingCard from "../../components/LandingCard/LandingCard";
import Navigation from "../../components/Navigation/Navigation";
import LibraryCard from "../../components/LibraryCard/LibraryCard";
import './HomePage.css';

import { app } from '@electron/remote';
import { useEffect, useState } from "react";

const fs = require('fs');
const path = require('path');

function HomePage() {

  const [studySets, setStudySets] = useState<string[]>([]);

  useEffect(() => {
    const userDataPath = app.getPath('userData');
    const cardsDirectory = path.join(userDataPath, 'StudySets');
  
    fs.readdir(cardsDirectory, (err: NodeJS.ErrnoException | null, files: string[]) => {
      if (err) {
        console.error('Error reading the directory:', err);
        return;
      }
  
      const studySetTitles = files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
      setStudySets(studySetTitles);
      
    });
  }, []);

  return (
    <div>
      <Navigation />
      <div className="columns">
        <div className="column">
          <Link to="/editing" style={{ textDecoration: 'none' }}>
            <LandingCard
              title="Import Flashcard Set"
              description="Get help generating an outline for your assigned topic"
              overlayColor="rgba(255, 0, 0, 0.2)" />
          </Link>
        </div>
        <div className="column">
          <LandingCard
            title="Create Your Own"
            description="Get help generating an outline for your assigned topic"
            overlayColor="rgba(255, 0, 0, 0.3)" />
        </div>
      </div>

      {studySets.map(studySet => (
        <div key={studySet} className="column">
          <Link to={`/viewing/${encodeURIComponent(studySet)}`} style={{ textDecoration: 'none' }}>
            <LibraryCard title={studySet} />
          </Link>
        </div>
      ))}

    </div>
  );
}

export default HomePage;
