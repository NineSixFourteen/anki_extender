
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Component} from "solid-js";
import { PlusIcon } from "./Icons";
import { ChevronDown } from "lucide-solid";


interface ButtonAddImports {
    setWordStore: Function,

}

export const ButtonAdd: Component<ButtonAddImports> = (props) => {
    
    return (
        <DropdownMenu placement='bottom-end'>
            <div class="button-group">
                <div class="split-btn-wrapper">
                    <button 
                    class="btn-main btn-green" 
                    onClick={() => console.log("Add word clicked")}
                    > <PlusIcon/> </button>

                    <DropdownMenu.Trigger class="btn-arrow btn-green">
                    <ChevronDown size={14} strokeWidth={3} />
                    </DropdownMenu.Trigger>
                </div>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content class="dropdown-content">
                    <DropdownMenu.Item class="dropdown-item">Add Multiple </DropdownMenu.Item>
                    <DropdownMenu.Item class="dropdown-item">Import from CSV</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </div>
        </DropdownMenu>
    )
}
