import { Component, createResource, createSignal} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { createPersistentStore } from '~/lib/Storage';
import './SelectLang.css'

interface SelectLangImports {

}

export const SelectLang: Component<SelectLangImports> = (props) => {

  return (
    <div class='inputLabel'>
        <label> Select Language: </label>
        <select class="toolbar-select">
            <option value={"sap"}>Spanish</option>
            <option value={"eng"}>English</option>
        </select>
    </div>
  );
};

export default SelectLang;