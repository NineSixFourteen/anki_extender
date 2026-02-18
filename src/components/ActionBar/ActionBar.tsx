import { Component, createResource, createSignal} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { fetchAnkiDecks } from '~/lib/AnkiFetch';
import { ButtonAdd } from './ButtonAdd';
import { ButtonPop } from './ButtonPop';
import { SelectDeck } from './SelectDeck';
import { SelectWord } from './SelectWord';
import { createStore } from 'solid-js/store'; 
import { ButtonSet } from './ButtonSet';
import './CSS/Button.css'
import './CSS/Dropdown.css'
import './CSS/Select.css'
import './CSS/ActionBar.css'
import { createPersistentStore } from '~/lib/Storage';


interface ActionBarImports {
    loadWord: Function,

}

export const ActionBar: Component<ActionBarImports> = (props) => {

  const [decks] = createResource(fetchAnkiDecks);
  const {setCardStore} = useCards();
  const [wordStore, setWordStore] = createPersistentStore<string[]>("store",[]);
  const [currentWord, setCurrentWord] = createSignal("");


  return (
    <div class="actionBar">
      <div class="actionBarInner">
        <div class="toolbar-container">
          <SelectDeck decks={decks} setCardStore={setCardStore} />

          <div class="rightSide">
            <SelectWord wordStore={wordStore} currentWord={currentWord} setCurrentWord={setCurrentWord}  />
            <div class='button-group'>
              <ButtonAdd setCurrentWord={setCurrentWord} wordStore={wordStore} setWordStore={setWordStore} />
              <ButtonPop setWordStore={setWordStore} />
              <ButtonSet currentWord={currentWord} loadWord={props.loadWord} />
              <button class="btn-single btn-grey">---</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ActionBar;