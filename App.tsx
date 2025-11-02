
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Generator from './components/Generator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Generator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
