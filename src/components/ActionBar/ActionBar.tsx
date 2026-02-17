import { createResource, For, Show } from 'solid-js';
import s from './ActionBar.module.css';
import { useCards } from '~/lib/Models/CardContext';
import { useStatusBarInfo } from '~/lib/Models/StatusContext';
import { fetchAnkiDecks } from '~/lib/api';

export function ActionBar(){

  const [decks] = createResource(fetchAnkiDecks);
  const { CardStore,setCardStore} = useCards();

  return (
    <div class={s.actionBar}>
      <div class={s.actionBarInner}>
        <div class={s.controlGroup}>
          <label>Target Deck</label>
          <Show when={decks()} fallback={<p>Loading Decks...</p>}>
            <select value="Default" class={s.select} onChange={(e) => {
              setCardStore("Deck", e.currentTarget.value)
            }}>
              <For each={decks()}>
                {(deckName:string) => (
                  <option value={deckName}>{deckName}</option>
                )}
              </For>
            </select>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;