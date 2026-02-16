import { createSignal, For } from "solid-js";
import { query, action, useAction, useSubmission } from "@solidjs/router";
import { createAsync } from "@solidjs/router";

const getDecks = query(async () => {
  "use server";
  const response = await fetch("http://localhost:8765", {
    method: "POST",
    body: JSON.stringify({ action: "deckNames", version: 6 })
  });
  const json = await response.json();
  return json.result as string[]; // Returns ['Default', 'Spanish', 'Coding', etc]
}, "decks");


const addToAnki = action(async (formData: FormData) => {
  "use server";
  const front = formData.get("front") as string;
  const back = formData.get("back") as string;

  const response = await fetch("http://localhost:8765", {
    method: "POST",
    body: JSON.stringify({
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName: "Default",
          modelName: "Basic",
          fields: { Front: front, Back: back }
        }
      }
    })
  });
  return await response.json();
});


export default function Home() {
  const decks = createAsync(() => getDecks());
  const enrolling = useSubmission(addToAnki);

  return (
    <main>
      <nav>
        <div class="nav-inner">
          <strong style="color: #3b82f6">ANKI_SYNC</strong>
          <span style="font-size: 0.8rem; color: #4ade80">● API_CONNECTED</span>
        </div>
      </nav>

      <div class="main-wrapper">
        <form action={addToAnki} method="post" id="anki-form">
          <div class="grid-container">
            <div class="column">
              <div class="label">FRONT (IMAGE)</div>
              <textarea name="front" placeholder="Paste image tag..." required />
            </div>
            
            <div class="column">
              <div class="label">BACK (AUDIO + TEXT)</div>
              <textarea name="back" placeholder="[sound:...] + target text" required />
            </div>

            <div class="column">
              <div class="label">ENGLISH_TRANSLATION</div>
              <textarea name="english" placeholder="English version..." required />
            </div>
          </div>
        </form>

        <div class="bottom-bar">
          <div style="display: flex; gap: 20px;">
            <select name="deckName" form="anki-form" style="padding: 10px; background: #222; color: #fff; border: 1px solid #333;">
              <For each={decks() ?? []}>
                {(deck) => <option value={deck}>{deck}</option>}
              </For>
            </select>
            <button type="submit" form="anki-form" style="padding: 10px 30px; background: #3b82f6; color: white; border: none; font-weight: bold; cursor: pointer;">
              COMMIT_TO_ANKI
            </button>
          </div>
          
          <div style="font-size: 1.2rem">
            {enrolling.result && (enrolling.result.error ? "❌ ERROR" : "✅ SUCCESS")}
          </div>
        </div>
      </div>
    </main>
  );
}