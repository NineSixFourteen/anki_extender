            
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Accessor, Component, createSignal, For, Show } from "solid-js";
import { PlusIcon, TrashIcon } from "./Icons";
import { ChevronDown } from "lucide-solid";

interface ButtonPopImports {
    setWordStore: Function,

}
export const ButtonPop: Component<ButtonPopImports> = (props) => {
    
    return (
            <DropdownMenu placement='bottom-end'>
              <div class="button-group">
                <div class="split-btn-wrapper">
                  <button 
                    class="btn-main btn-blue" 
                    onClick={() => console.log("POP")}
                  > 
                    <TrashIcon />
                  </button>
                      <DropdownMenu.Trigger class="btn-arrow btn-blue">
                        <ChevronDown size={14} strokeWidth={3} />
                      </DropdownMenu.Trigger>
                </div>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content class="dropdown-content">
                    <DropdownMenu.Item class="dropdown-item">Pop 5 </DropdownMenu.Item>
                    <DropdownMenu.Item class="dropdown-item">Pop All</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </div>
            </DropdownMenu>
    )
}
            
            
