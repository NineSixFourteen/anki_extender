import { Component, createResource, createSignal} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { fetchAnkiDecks } from '~/lib/AnkiFetch';
import { ButtonAdd } from './ButtonAdd';
import { ButtonPop } from './ButtonPop';
import { SelectDeck } from './SelectDeck';
import { SelectWord } from './SelectWord';
import { ButtonSet } from './ButtonSet';
import './CSS/Button.css'
import './CSS/Dropdown.css'
import './CSS/Select.css'
import './CSS/ActionBar.css'
import { createPersistentStore } from '~/lib/Storage';
import ActionBar from '../Common/ActionBar/ActionBar';


interface ActionBar2Imports {
    loadWord: Function,

}

export const ActionBar2: Component<ActionBar2Imports> = (props) => {

  const [decks] = createResource(fetchAnkiDecks);
  const {setCardStore} = useCards();
  const [wordStore, setWordStore] = createPersistentStore<string[]>("store",[]);
  const [currentWord, setCurrentWord] = createSignal("");


  return (
    <ActionBar
      leftSide={[<SelectDeck decks={decks} setCardStore={setCardStore} />]}
      rightSide={[
            <SelectWord wordStore={wordStore} currentWord={currentWord} setCurrentWord={setCurrentWord}  />,
            <div class='button-group'>
              <ButtonAdd setCurrentWord={setCurrentWord} wordStore={wordStore} setWordStore={setWordStore} />
              <ButtonPop wordStore={wordStore} setCurrentWord={setCurrentWord} setWordStore={setWordStore} />
              <ButtonSet currentWord={currentWord} loadWord={props.loadWord} />
            </div>
    ]} />

  );
};

export default ActionBar;