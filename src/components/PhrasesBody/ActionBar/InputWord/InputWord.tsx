import { Component, createResource, createSignal} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { createPersistentStore } from '~/lib/Storage';
import './InputWord.css'

interface InputWordImports {
  word:Function,
  setWord:Function
}

export const InputWord: Component<InputWordImports> = (props) => {

  return (
    <div class='inputLabel'>
        <label> Enter Word: </label>
        <input
            value={props.word()}
            onChange={(e) => props.setWord(e.currentTarget.value)}
            class="inputInput" 
            placeholder="Enter word"
        />
    </div>
  );
};

export default InputWord;