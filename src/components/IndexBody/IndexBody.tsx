import { A } from "@solidjs/router";
import './IndexBody.css'

export default function IndexBody() {
  return (
    <main class="welcome-container">
      <header class="welcome-header">
        <h1>Anki Deck Builder</h1>
        <p>Choose your entry type to get started</p>
      </header>

      <nav class="button-grid">
        <A href="/basic" class="nav-button">
          <span class="icon">🔤</span>
          <div class="label-group">
            <span class="title">Basic</span>
            <span class="desc">Add single words & definitions</span>
          </div>
        </A>

        <A href="/phrases" class="nav-button">
          <span class="icon">🗣️</span>
          <div class="label-group">
            <span class="title">Phrases</span>
            <span class="desc">Add full sentences & context</span>
          </div>
        </A>
      </nav>

    </main>
  );
}