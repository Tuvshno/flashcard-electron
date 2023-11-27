import { Link } from "react-router-dom";

import LandingCard from "../../components/LandingCard/LandingCard";
import Navigation from "../../components/Navigation/Navigation";
import './HomePage.css';

function HomePage() {
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
    </div>
  );
}

export default HomePage;
