import { Component } from 'solid-js';
import s from './Navbar.module.css'; // If using modules, otherwise use global classes

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

