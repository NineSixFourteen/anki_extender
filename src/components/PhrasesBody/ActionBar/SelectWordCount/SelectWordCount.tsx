import { Component, createResource, createSignal} from 'solid-js';
import './SelectWordCount.css'

interface SelectWordCountImports {
  wordCount:Function,
  setWordCount:Function
}

export const SelectWordCount: Component<SelectWordCountImports> = (props) => {

  return (
    <div class='inputLabel'>
        <label> Select Word Count: </label>
        <select value={props.wordCount()} onChange={(e) => props.setWordCount(e.currentTarget.value)} class="toolbar-select">
            <option value={"-5"}>{"<5"}</option>
            <option value={"5-"}>{">5"}</option>
            <option value={"5-10"}>{"5-10"}</option>
            <option value={"-10"}>{"<10"}</option>
            <option value={"10-"}>{"10>"}</option>
        </select>
    </div>
  );
};

export default SelectWordCount;