import { createResource, createSignal, For, Show } from "solid-js";
import { query, action, useAction, useSubmission } from "@solidjs/router";
const [searchTerm, setSearchTerm] = createSignal("");
import { addToAnki } from "../lib/api";
import { ImageSection } from "~/components/ImageSection/ImageSection";
import { WordSection } from "~/components/WordSection/WordSection";


const handleSearch = (e: Event) => {
  e.preventDefault();
  const query = encodeURIComponent(searchTerm());
  // Opens Google Images in a small popup window so you don't lose your work
  window.open(
    `https://www.google.com/search?tbm=isch&q=${query}`,
    'googleImages',
    'width=900,height=700'
  );
};


export default function Home() {
  const [imgData, setImgData] = createSignal("");
  const enrolling = useSubmission(addToAnki);


  const [decks] = createResource(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8765", {
        method: "POST",
        body: JSON.stringify({ action: "deckNames", version: 6 }),
      });
      const data = await response.json();
      return data.result as string[];
    } catch (e) {
      console.error("Anki not running");
      return ["Default"]; // Fallback so the app doesn't crash
    }
  });

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          setImgData(base64); // This stores the image data for Anki
        };
        reader.readAsDataURL(blob!);
      }
    }
  };

  return (
    <main>
      <nav>
        <div class="nav-inner">
          <div class="nav-brand">ANKI_SYNC_PRO</div>
          <div class="nav-status">
            <Show when={enrolling.pending}>
              <span class="status-syncing">SYNCING...</span>
            </Show>
            <Show when={!enrolling.pending}>
              <span class="status-online">● API_READY</span>
            </Show>
          </div>
        </div>
      </nav>

      <div class="action-bar">
          <div class="action-bar-inner">
            <div class="control-group">
              <label>TARGET_DECK</label>
              <select name="deckName" form="anki-form">
                <For each={decks() ?? []}>
                  {(deck) => <option value={deck}>{deck}</option>}
                </For>
              </select>
            </div>

            <button 
              type="submit" 
              form="anki-form" 
              class="send-button"
              disabled={enrolling.pending}
            >
              {enrolling.pending ? "SENDING..." : "SEND TO ANKI"}
            </button>
          </div>
        </div>


      <div class="main-wrapper">
        <form action={addToAnki} method="post" id="anki-form">
          <div class="grid-container">
            <ImageSection />
            <WordSection/>
                <div class="column">
              <div class="label">ENGLISH</div>
              <textarea name="english" required />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}