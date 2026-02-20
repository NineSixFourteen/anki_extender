import { Component, createResource, createSignal} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { createPersistentStore } from '~/lib/Storage';
import InputWord from './InputWord/InputWord';
import './ActionBar.css'
import SelectLang from './SelectLang/SelectLang';
import SelectWordCount from './SelectWordCount/SelectWordCount';


interface ActionBarImports {

}

export const ActionBar: Component<ActionBarImports> = (props) => {

  return (
    <div class="actionBar">
        <div class="actionBarInner">
            <InputWord />
            <SelectLang />
            <SelectWordCount />
            <div class="rightSide">
                <button class="check-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
  );
};

export default ActionBar;