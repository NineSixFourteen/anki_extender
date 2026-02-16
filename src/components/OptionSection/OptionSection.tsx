import { Component } from 'solid-js';
import s from './OptionSection.module.css';

export function OptionSection() {
  return (
    <div class="column">
      <div class="label">Other Column</div>

      <div class="paneSearch">
        <input 
          id="imgSearch" 
          type="text" 
          placeholder="Search for image..." 
        />
        <button class="searchButton" type="button">FIND</button>
      </div>

      <div class="zone" tabindex="0">
      </div>

      <div class="label" style="background: #111; border-top: 1px solid #2a2a2a; font-size: 0.6rem;">
      English (OPTIONAL)
      </div>
      <textarea 
        name="frontText" 
        placeholder="Type english word or sentence idc..." 
        class="smallTextarea"
      />
      
    </div>
  );
};

