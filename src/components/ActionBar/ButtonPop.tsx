            
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Accessor, Component, createSignal, For, Show } from "solid-js";
import { ChevronDown } from "lucide-solid";
import { TrashIcon } from "../Common/Icons/ActionBar";
import { DropDownButton } from "../Common/Buttons/DropDownButton";

interface ButtonPopImports {
    setWordStore: Function,
    wordStore: string[], 
    setCurrentWord:Function

}
export const ButtonPop: Component<ButtonPopImports> = (props) => {

    function pop(num:number){
      props.setWordStore((prev: string | any[]) => prev.slice(num))
      props.setCurrentWord(props.wordStore[0] || "Press the + button to add a word");
    }
    
    return (
      <DropDownButton
        text={<TrashIcon/>}
        clickFunc={() => pop(1)}
        colorStyle="btn-blue"
        dropDowns={[
          <DropdownMenu.Item class="dropdown-item" onClick={() =>pop(5)}>Pop 5 </DropdownMenu.Item>,
          <DropdownMenu.Item class="dropdown-item" onClick={() => props.setWordStore([])}>Pop All</DropdownMenu.Item>
        ]}
        popups={[]}
      />
    )
}
            
            
