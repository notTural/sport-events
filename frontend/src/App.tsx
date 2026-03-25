import Navbar from './components/Navbar';
import EventList from './components/EventList';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <EventList />
      </main>
    </>
  );
}

export default App;
