            
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
                    onClick={() => props.setWordStore((prev: string | any[]) => prev.slice(1))}
                  > 
                    <TrashIcon />
                  </button>
                      <DropdownMenu.Trigger class="btn-arrow btn-blue">
                        <ChevronDown size={14} strokeWidth={3} />
                      </DropdownMenu.Trigger>
                </div>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content class="dropdown-content">
                    <DropdownMenu.Item class="dropdown-item" onClick={() => props.setWordStore((prev: string | any[]) => prev.slice(5))}>Pop 5 </DropdownMenu.Item>
                    <DropdownMenu.Item class="dropdown-item" onClick={() => props.setWordStore([])}>Pop All</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </div>
            </DropdownMenu>
    )
}
            
            
