export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">⚽</span>
        <span className="navbar-title">Sport Events</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#" className="active">Events</a></li>
        <li><a href="#">Teams</a></li>
        <li><a href="#">Competitions</a></li>
      </ul>
    </nav>
  );
}
