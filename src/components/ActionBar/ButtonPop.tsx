            
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Accessor, Component, createSignal, For, Show } from "solid-js";
import { PlusIcon, TrashIcon } from "./Icons";
import { ChevronDown } from "lucide-solid";

interface ButtonPopImports {
    setWordStore: Function,
    wordStore: string[], 
    setCurrentWord:Function

}
export const ButtonPop: Component<ButtonPopImports> = (props) => {

    function pop(num:number){
      props.setWordStore((prev: string | any[]) => prev.slice(num))
      props.setCurrentWord(props.wordStore[0]);
    }
    
    return (
            <DropdownMenu placement='bottom-end'>
              <div class="button-group">
                <div class="split-btn-wrapper">
                  <button 
                    class="btn-main btn-blue" 
                    onClick={() => pop(1)}
                  > 
                    <TrashIcon />
                  </button>
                      <DropdownMenu.Trigger class="btn-arrow btn-blue">
                        <ChevronDown size={14} strokeWidth={3} />
                      </DropdownMenu.Trigger>
                </div>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content class="dropdown-content">
                    <DropdownMenu.Item class="dropdown-item" onClick={() =>pop(5)}>Pop 5 </DropdownMenu.Item>
                    <DropdownMenu.Item class="dropdown-item" onClick={() => props.setWordStore([])}>Pop All</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </div>
            </DropdownMenu>
    )
}
            
            
