import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import TeamList from './components/TeamList';
import CompetitionList from './components/CompetitionList';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/competitions" element={<CompetitionList />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
