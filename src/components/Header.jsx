import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/" className="header-logo">
          Job Tracker
        </Link>
        <div className="header-links">
          <NavLink to="/" end className="header-link">
            Applications
          </NavLink>
          <Link to="/add" className="button button-primary">
            Add application
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
