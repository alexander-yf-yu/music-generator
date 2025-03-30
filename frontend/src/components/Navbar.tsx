import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div>
      <div className="navbar-brand">
        <h1>Music Generator</h1>
        <span className="tagline">A social platform</span>
      </div>
      <div className="navbar-links">
        <a href="/" className="active">Home</a>
        <a href="/about">About</a>
      </div>
      </div>
    </nav>
  );
}
