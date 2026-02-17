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
          <button class={s.sendButton} onClick={() => logAnki()}>
            SEND TO ANKI
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;