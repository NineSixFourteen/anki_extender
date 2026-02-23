import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Accessor, Component, createSignal, For, Show } from "solid-js";
import { ChevronDown } from "lucide-solid";
import { TickIcon } from "../Common/Icons/ActionBar";

interface ButtonSetImports {
    currentWord: Function,
    loadWord: Function

}
export const ButtonSet: Component<ButtonSetImports> = (props) => {
    
    return (
        <button class="btn-single btn-yellow" onClick={() => {
            props.loadWord(props.currentWord())
        }}
        ><TickIcon /></button>
    )
}
            
            
