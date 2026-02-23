import { Component, createResource, createSignal, For} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { fetchAnkiDecks } from '~/lib/AnkiFetch';
import { ButtonAdd } from './ButtonAdd';
import { ButtonPop } from './ButtonPop';
import { ButtonSet } from './ButtonSet';
import './CSS/Button.css'
import './CSS/Dropdown.css'
import './CSS/Select.css'
import './CSS/ActionBar.css'
import { createPersistentStore } from '~/lib/Storage';
import ActionBar from '../Common/ActionBar/ActionBar';
import { GenericSelect } from '../Common/GenericSelect/GenericSelect';


interface ActionBar2Imports {
    loadWord: Function,

}

export const ActionBar2: Component<ActionBar2Imports> = (props) => {

  const [decks] = createResource(fetchAnkiDecks);
  const {setCardStore} = useCards();
  const [wordStore, setWordStore] = createPersistentStore<string[]>("store",[]);
  const [currentWord, setCurrentWord] = createSignal("");

  function updateDeck(value:string){
    setCardStore("Deck", value)
  }

  return (
    <ActionBar
      leftSide={[<GenericSelect label='Target Deck'value={decks || "Default"} setValue={updateDeck} options={[
        <For each={decks()}>
            {(deckName:string) => (
            <option value={deckName}>{deckName}</option>
            )}
        </For>
      ]} />]}
      rightSide={[
            <GenericSelect label='Word List'  value={currentWord} setValue={setCurrentWord} options={[
              <For each={wordStore.length > 0 ? wordStore : ["Press the + button to add a word"] }>
                  {
                      (word) => <option value={word}>{word}</option>
                  }
              </For>]
            }  />,
            <div class='button-group'>
              <ButtonAdd setCurrentWord={setCurrentWord} wordStore={wordStore} setWordStore={setWordStore} />
              <ButtonPop wordStore={wordStore} setCurrentWord={setCurrentWord} setWordStore={setWordStore} />
              <ButtonSet currentWord={currentWord} loadWord={props.loadWord} />
            </div>
    ]} />

  );
};
