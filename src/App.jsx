import { motion } from 'framer-motion';
import { useState } from 'react';
import AppointmentBooking from './components/AppointmentBooking';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'booking':
        return <AppointmentBooking />;
      case 'home':
      default:
        return <Hero onBookNow={() => setCurrentPage('booking')} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {renderPage()}
      </motion.main>
      <Footer />
    </div>
  );
}

export default App;
