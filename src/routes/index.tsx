import { createResource, createSignal, For, Show } from "solid-js";
import { query, action, useAction, useSubmission } from "@solidjs/router";
const [searchTerm, setSearchTerm] = createSignal("");
import { addToAnki } from "../lib/api";
import { ImageSection } from "~/components/ImageSection/ImageSection";
import { WordSection } from "~/components/WordSection/WordSection";
import { Navbar } from '~/components/Navbar/Navbar';
import { ActionBar } from '~/components/ActionBar/ActionBar'
import { HelpSection } from "~/components/HelpSection/HelpSection";

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
      <Navbar />
      <ActionBar/>
      <div class="main-wrapper">
          <div class="grid-container">
            <ImageSection />
            <WordSection/>
            <HelpSection />
          </div>
      </div>
    </main>
  );
}