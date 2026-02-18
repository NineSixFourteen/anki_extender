import { Component } from 'solid-js';
import './Navbar.css'; 

export function Navbar() {
  return (
    <nav class="nav">
      <div class="nav-inner">
        <div class="nav-brand">LEXICON ✨</div>
        <div class="api-status">
          <span class="status-dot"></span>
          ANKI ONLINE
        </div>
      </div>
    </nav>
  );
};

