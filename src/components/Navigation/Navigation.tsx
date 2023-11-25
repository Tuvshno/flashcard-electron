import { Link } from "react-router-dom";
import './Navigation.css'

function Navigation() {
  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <Link to="/editing">Editing</Link>
      <Link to="/viewing">Viewing</Link>
    </div>
  );
}

export default Navigation