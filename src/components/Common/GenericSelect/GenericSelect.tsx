import {Component, For, JSXElement, Show } from "solid-js";

interface GenericSelectImports {
    label:string,
    value: Function,
    setValue:Function,
    options: JSXElement[]
}

export const GenericSelect: Component<GenericSelectImports> = (props) => {
    
    return (
        <div class='SelectWord'>
            <label>{props.label}</label>
            <select value={props.value()} onChange={(e) => props.setValue(e.currentTarget.value)} class="toolbar-select">
                <For each={props.options}>
                    {(element) => element}
                </For>
            </select>
            <Show when={props.value() == "Custom:"}>
                <input class="delimText" placeholder={"Enter " + props.label}   type="text"  >
                </input>
            </Show>
        </div>
    )
}
          