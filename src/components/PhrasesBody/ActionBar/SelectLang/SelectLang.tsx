import { Component, createResource, createSignal} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { createPersistentStore } from '~/lib/Storage';
import './SelectLang.css'

interface SelectLangImports {
  lang:Function,
  setLang:Function,
}

export const SelectLang: Component<SelectLangImports> = (props) => {

  return (
    <div class='inputLabel'>
        <label> Select Language: </label>
        <select value={props.lang()} onChange={(e) => props.setLang(e.currentTarget.value)} class="toolbar-select">
            <option value={"spa"}>Spanish</option>
            <option value={"eng"}>English</option>
        </select>
    </div>
  );
};

export default SelectLang;