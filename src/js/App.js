import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Blog from "../components/Blog";
import Projects from "../components/Projects"; 
import Footer from "../components/Footer";
import "../css/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Projects />} /> {/* 새로 추가 */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
