import { createResource, For, Show } from 'solid-js';
import s from './ActionBar.module.css';
import { useCards } from '~/lib/Models/CardContext';
import { fetchAnkiDecks } from '~/lib/AnkiFetch';
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { ChevronDown, PlusIcon, TrashIcon } from "lucide-solid";
import { TickIcon } from './Icons';

export function ActionBar(){

  const [decks] = createResource(fetchAnkiDecks);
  const { CardStore,setCardStore} = useCards();

  function wordList(){
    return []
  }


  return (
    <div class={s.actionBar}>
      <div class={s.actionBarInner}>
          <div class="toolbar-container">
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


          
          <div class="rightSide">
            <label>Word List</label>
            <select class="toolbar-select">
              <For each={wordList().length > 0 ? wordList() : ["Press the + button to add a word"] }>{(word) => <option value={word}>{word}</option>}</For>
            </select>
            <DropdownMenu placement='bottom-end'>
              <div class="button-group">
                  <div class="split-btn-wrapper">
                    <button 
                      class="btn-main btn-green" 
                      onClick={() => console.log("Add word clicked")}
                    > <PlusIcon/> </button>

                    <DropdownMenu.Trigger class="btn-arrow btn-green">
                      <ChevronDown size={14} strokeWidth={3} />
                    </DropdownMenu.Trigger>
                  </div>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content class="dropdown-content">
                      <DropdownMenu.Item class="dropdown-item">Add Multiple </DropdownMenu.Item>
                      <DropdownMenu.Item class="dropdown-item">Import from CSV</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                  </div>
                </DropdownMenu>

                <DropdownMenu placement='bottom-end'>
                    <div class="button-group">
                        <div class="split-btn-wrapper">
                          <button 
                            class="btn-main btn-blue" 
                            onClick={() => console.log("POP")}
                          > <TrashIcon /> </button>
                       


                  <DropdownMenu.Trigger class="btn-arrow btn-blue">
                    <ChevronDown size={14} strokeWidth={3} />
                  </DropdownMenu.Trigger>
                </div>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content class="dropdown-content">
                      <DropdownMenu.Item class="dropdown-item">Pop 5 </DropdownMenu.Item>
                      <DropdownMenu.Item class="dropdown-item">Pop All</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
              </div>
            </DropdownMenu>

            {/* Yellow L */}
            <button class="btn-single btn-yellow"><TickIcon /></button>

            {/* Grey Placeholder */}
            <button class="btn-single btn-grey">---</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ActionBar;