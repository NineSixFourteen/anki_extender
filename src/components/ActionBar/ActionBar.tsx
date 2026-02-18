import { createResource} from 'solid-js';
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

export function ActionBar(){

  const [decks] = createResource(fetchAnkiDecks);
  const { CardStore,setCardStore} = useCards();

  const [wordStore, setWordStore] = createStore<string[]>([]);

  return (
    <div class="actionBar">
      <div class="actionBarInner">
        <div class="toolbar-container">
          <SelectDeck decks={decks} setCardStore={setCardStore} />

          <div class="rightSide">
            <SelectWord wordStore={wordStore}  />
            <div class='button-group'>
              <ButtonAdd wordStore={wordStore} setWordStore={setWordStore} />
              <ButtonPop setWordStore={setWordStore} />
              <ButtonSet setWordStore={setWordStore} />
              <button class="btn-single btn-grey">---</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ActionBar;