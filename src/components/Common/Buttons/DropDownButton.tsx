
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Component, createSignal, For, JSXElement, Show} from "solid-js";
import { ChevronDown } from "lucide-solid";

interface DropDownButtonImports {
    text:JSXElement,
    clickFunc:Function,
    colorStyle:string,
    dropDowns: JSXElement[],
    popups:JSXElement[]
}

export const DropDownButton: Component<DropDownButtonImports> = (props) => {
    
    return (
        <DropdownMenu placement='bottom-end'>
            <div class="button-group">
                <div class="split-btn-wrapper">
                    <div class="relative-container">
                        <button 
                            class={"btn-main " + props.colorStyle} 
                            onClick={() => props.clickFunc()}
                        > {props.text} </button>
                        <For each={props.popups}>
                            {(element) => element}
                        </For>
                    </div>
                    <DropdownMenu.Trigger class={"btn-arrow "  + props.colorStyle} >
                        <ChevronDown size={14} strokeWidth={3} />
                    </DropdownMenu.Trigger>
                </div>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content class="dropdown-content">
                        <For each={props.dropDowns}>
                            {(element) => element}
                        </For>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </div>
        </DropdownMenu>
    )
}
