import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/" className="brand-link">
        <h2>do_ong.io</h2>
      </Link>
      <nav>
        <Link to="/">About</Link>
        <Link to="/blog">Blog</Link>
        <a href="#projects">Projects</a>
      </nav>
    </header>
  );
}

export default Header;