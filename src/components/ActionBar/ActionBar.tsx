import { Component } from 'solid-js';
import s from './ActionBar.module.css';

export function ActionBar(){
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
          <button class={s.sendButton}>
            SEND TO ANKI
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;