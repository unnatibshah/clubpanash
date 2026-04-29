import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Promos from './components/Promos';
import Gallery from './components/Gallery';
import Hours from './components/Hours';
import PrivateEvents from './components/PrivateEvents';
import Footer from './components/Footer';
import EventCalendarModal from './components/EventCalendarModal';
import TopEvents from './components/TopEvents';
import './styles/global.css';
import './styles/mobile.css'; 

function App() {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar onCalendarOpen={() => setCalendarOpen(true)} />
        <Hero onCalendarOpen={() => setCalendarOpen(true)} />
        <TopEvents />  
        <About />
        <Promos />
        <Gallery />
        <Hours />
        <PrivateEvents />
        <Footer onCalendarOpen={() => setCalendarOpen(true)} />
        <EventCalendarModal open={calendarOpen} onClose={() => setCalendarOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
