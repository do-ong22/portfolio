import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Blog from '../components/Blog';
import Footer from '../components/Footer';
import '../css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
