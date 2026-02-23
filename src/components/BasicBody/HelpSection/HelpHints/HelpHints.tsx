import { Accessor, Component, createSignal, For, Show } from "solid-js";
import styles from '../HelpSection.module.css';

interface HelpHintsImports {
    hints: StupidString[],
    setHints: Function,
    setCardStore: Function,
}

export const HelpHints: Component<HelpHintsImports> = (props) => {
    
    const addHint = () => {
        if (props.hints.length < 4) {
            props.setHints(props.hints.length, {text:""});
        }
    };

    return (
      <div class="zone" style="display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
        <For each={props.hints}>
          {(hint, i) => (
            <input 
              type="text" 
              class={styles.hintInput}
              placeholder={`Hint ${i() + 1}...`} 
              value={hint.text}
              onInput={(e) => {
                props.setHints(i(), {text:e.currentTarget.value})
                props.setCardStore("Hints",props.hints);
              }}
            />
          )}
        </For>

        <Show when={props.hints.length < 4}>
          <button 
            class={styles.addHintButton} 
            onClick={addHint} 
            type="button"
          >
            + Add a hint
          </button>
        </Show>
      </div>
    )
}