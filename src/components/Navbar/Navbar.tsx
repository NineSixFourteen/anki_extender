import { A } from "@solidjs/router";
import './Navbar.css'

export function Navbar() {
  return (
    <nav class="nav">
      <div class="nav-inner">
        {/* Left Side */}
        <A href="/" class="nav-brand" style="text-decoration: none;">
          ANKI-EXTENDER ✨
        </A>
        
        {/* Right Side */}
        <div class="nav-links">
          <A href="/basic" class="nav-link">Basic</A>
          <A href="/phrases" class="nav-link">Phrases</A>
        </div>
      </div>
    </nav>
  );
}