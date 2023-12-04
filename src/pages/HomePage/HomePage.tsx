import { Link } from "react-router-dom";

import LandingCard from "../../components/LandingCard/LandingCard";
import Navigation from "../../components/Navigation/Navigation";
import LibraryCard from "../../components/LibraryCard/LibraryCard";
import './HomePage.css';

import { app } from '@electron/remote';
import { useEffect, useState } from "react";
import FileTree from "../../Utilities/FileTree";

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
  var sampleTreeStructure = {
    "name": "src",
    "fullpath": "/project/src",
    "type": "folder",
    "files": [
        {
            "name": "index.html",
            "fullpath": "/project/src/index.html",
            "type": "file",
            "filetype": "html"
        },
        {
          "name": "main.css",
          "fullpath": "/project/src/main.css",
          "type": "file",
          "filetype": "css"
        },
        {
          "name": "pages",
          "fullpath": "/project/src/pages",
          "type": "folder",
          "files": [
            {
              "name": "about.html",
              "fullpath": "/project/src/pages/about.html",
              "type": "file",
              "filetype": "html"
            }
          ]
        }
    ]
}
  return (
    <div>
      <Navigation />
      <FileTree file={sampleTreeStructure}/>
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
