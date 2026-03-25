import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">⚽</span>
        <span className="navbar-title">Sport Events</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/teams" className={({ isActive }) => isActive ? 'active' : ''}>
            Teams
          </NavLink>
        </li>
        <li>
          <NavLink to="/competitions" className={({ isActive }) => isActive ? 'active' : ''}>
            Competitions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
