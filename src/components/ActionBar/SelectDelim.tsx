import {Component, For, Show } from "solid-js";

interface SelectDelimImports {
    selectedDelim: Function,
    setSelectedDelim: Function

}

export const SelectDelim: Component<SelectDelimImports> = (props) => {
    
    return (
        <>
            <label>Delimiter: </label>
            <select value={props.selectedDelim()} onChange={(e) => props.setSelectedDelim(e.currentTarget.value)} class="selectDelimiter">
                <option value=",">Comma: ,</option>
                <option value="|">Pipe/OR: |,</option>
                <option value="&">AND: &</option>
                <option value=".">Dot: .</option>
                <option value="%">REM: %</option>
                <option value="*">MUL: *</option>
                <option value=":">Colon: :</option>
                <option value=";">SemiColon: ;</option>
                <option value="Custom:">Custom: </option>
            </select>
            <Show when={props.selectedDelim() == "Custom:"}>
                <input class="delimText" placeholder="Enter Delimiter"  type="text"  >
                
                </input>
            </Show>
        </>
    )
}
            
            




