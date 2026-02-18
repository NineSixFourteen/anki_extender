import {Component, For, Show } from "solid-js";

interface SelectWordImports {
    wordStore: string[],
}

export const SelectWord: Component<SelectWordImports> = (props) => {
    
    return (
        <div class='SelectWord'>
            <label>Word List</label>
            <select class="toolbar-select">
                <For each={props.wordStore.length > 0 ? props.wordStore : ["Press the + button to add a word"] }>
                    {
                        (word) => <option value={word}>{word}</option>
                    }
                </For>
            </select>
        </div>
    )
}
                        
                        
            
            
            
            
            