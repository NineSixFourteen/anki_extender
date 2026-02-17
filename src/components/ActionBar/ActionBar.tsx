import { Component, createEffect } from 'solid-js';
import s from './ActionBar.module.css';
import { useCards } from '~/lib/Models/CardContext';
import { unwrap } from 'solid-js/store';

export function ActionBar(){

const { CardStore } = useCards();

  function logAnki() {
    console.log("Current CardStore Data:", CardStore);
    console.log("Hints:", CardStore.Hints);
    console.log("FrontText: ", CardStore.FrontText)
    console.log("Image: ", CardStore.Image)
    console.log("TargetWord: ", CardStore.TargetWord)
    console.log("Audio: ", CardStore.Audio)
    console.log("English: " + CardStore.English)
  }
  async function sendCard() {
    logAnki();
    sendImageToAnki();
    sendAudioToAnki();
    sendCardsToAnki();

  }

  async function sendImageToAnki() {

    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "storeMediaFile",
        version: 6,
        params: {
          filename: CardStore.TargetWord + ".jpg", 
          data: CardStore.Image   
        }
      })
    });
    const result = await response.json();
    if (result.error) {
      console.error("Anki failed to save image:", result.error);
    } else {
      console.log("Success! Image saved as:", result.result); 
    }
  }

  async function sendAudioToAnki(){    
    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "storeMediaFile",
        version: 6,
        params: {
          filename: CardStore.TargetWord + ".mp3",
          url: CardStore.Audio
        }
      })
    });
    
    const result = await response.json();
        if (result.error) {
      console.error("Anki failed to save card:", result.error);
    } else {
      console.log("Success! audio saved as:", result.result); 
    }
  }

  async function sendCardsToAnki(){
    console.log(`[sound:${CardStore.TargetWord}.mp3]`);
    console.log(`<img src="${CardStore.TargetWord}.jpg">`)
    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "addNote",
        version: 6,
        params: {
          note: {
            deckName: "TestDeck",
            modelName: "TestCard",
            fields: {
              FrontText: String(CardStore.FrontText || ""),
              TargetWord: String(CardStore.TargetWord || ""),
              Hint_1: String(CardStore.Hints[0] || ""),
              Hint_2: String(CardStore.Hints[1] || ""),
              Hint_3: String(CardStore.Hints[2] || ""),
              Hint_4: String(CardStore.Hints[3] || ""),
              English: String(CardStore.English || ""),
              Audio: `[sound:${CardStore.TargetWord}.mp3]` || "",
              Image: `<img src="${CardStore.TargetWord}.jpg">` || ""
            }
          }
        }
      })
    });

    const result = await response.json();
    if (result.error) {
      console.error("Anki failed to save card:", result.error);
    } else {
      console.log("Success! card saved as:", result.result); 
    }
  }

  return (
    <div class={s.actionBar}>
      <div class={s.actionBarInner}>
        <div class={s.controlGroup}>
          <label>Target Deck</label>
          <select class={s.select}>
            <option>Default</option>
            <option>Spanish::Vocabulary</option>
          </select>
        </div>

        <div class={s.controlGroup}>
          <button class={s.sendButton} onClick={() => sendCard()}>
            SEND TO ANKI
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;