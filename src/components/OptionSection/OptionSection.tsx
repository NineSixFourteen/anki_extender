import { createSignal, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store'; // Use Store for stable list updates
import styles from './OptionSection.module.css';
import { useCards } from '~/lib/Models/CardContext';

export function OptionSection() {
  const [searchTerm, setSearchTerm] = createSignal("");
  
  const [hints, setHints] = createStore<StupidString[]>([]);
    const { setCardStore } = useCards();
  

  const exampleSentences = () => {
    if (searchTerm()) {
      window.open(`https://tatoeba.org/en/sentences/search?from=spa&query=${encodeURIComponent(searchTerm())}&to=eng`, '_blank');
    }
  };

  const addHint = () => {
    if (hints.length < 4) {
      setHints(hints.length, {text:""});
    }
  };

  return (
    <div class="column">
      <div class="label">Help</div>

      <div class="paneSearch">
        <input 
          id="imgSearch" 
          type="text" 
          placeholder="Search for example sentences..." 
          onInput={(e) => setSearchTerm(e.currentTarget.value)}
        />
        <button class="searchButton" onClick={exampleSentences} type="button">FIND</button>
      </div>

      <div class="zone" style="display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
        <For each={hints}>
          {(hint, i) => (
            <input 
              type="text" 
              class={styles.hintInput}
              placeholder={`Hint ${i() + 1}...`} 
              value={hint.text}
              onInput={(e) => {
                setHints(i(), {text:e.currentTarget.value})
                setCardStore("Hints",hints);
              }}
            />
          )}
        </For>

        <Show when={hints.length < 4}>
          <button 
            class={styles.addHintButton} 
            onClick={addHint} 
            type="button"
          >
            + Add a hint
          </button>
        </Show>
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