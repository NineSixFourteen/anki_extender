import { Component, createResource, createSignal} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { createPersistentStore } from '~/lib/Storage';
import './InputWord.css'

interface InputWordImports {

}

export const InputWord: Component<InputWordImports> = (props) => {

  return (
    <div class='inputLabel'>
        <label> Enter Word: </label>
        <input
            class="inputInput" 
            placeholder="Enter word"
        />
    </div>
  );
};

export default InputWord;