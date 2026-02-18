import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Accessor, Component, createSignal, For, Show } from "solid-js";
import { PlusIcon, TickIcon, TrashIcon } from "./Icons";
import { ChevronDown } from "lucide-solid";

interface ButtonSetImports {
    setWordStore: Function,

}
export const ButtonSet: Component<ButtonSetImports> = (props) => {
    
    return (
        <button class="btn-single btn-yellow"><TickIcon /></button>
    )
}
            
            
