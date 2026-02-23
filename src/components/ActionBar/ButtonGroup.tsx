            
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Accessor, Component, createSignal, For, Show } from "solid-js";
import { ChevronDown, PlusIcon } from "lucide-solid";
import { TickIcon, TrashIcon } from "../Common/Icons/ActionBar";
import { DropDownButton } from "../Common/Buttons/DropDownButton";
import { ModalInput } from "./ModalInput";
import ModalFile from "./ModalFile";
import { PopupText } from "./PopupText";

interface ButtonGroupImports {
    setWordStore: Function,
    wordStore: string[], 
    setCurrentWord:Function,
    currentWord:Function,
    loadWord:Function

}
export const ButtonGroup: Component<ButtonGroupImports> = (props) => {
    const [isVisible, setIsVisible] = createSignal(false);
    const [inputValue, setInputValue] = createSignal("");
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    const [isModaFilelOpen, setIsModalFileOpen] = createSignal(false);

    function pop(num:number){
      props.setWordStore((prev: string | any[]) => prev.slice(num))
      props.setCurrentWord(props.wordStore[0] || "Press the + button to add a word");
    }

    
    return (
        <div class='button-group'>
            <DropDownButton
            colorStyle='btn-green'
            dropDowns={[
                <DropdownMenu.Item class="dropdown-item" onClick={() => setIsModalOpen(true)} >Add Multiple </DropdownMenu.Item>,
                <DropdownMenu.Item class="dropdown-item" onClick={() => setIsModalFileOpen(true)}>Import from CSV</DropdownMenu.Item>
            ]}
            popups={[
                <ModalInput isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                        wordStore={props.wordStore} setWordStore={props.setWordStore} setCurrentWord={props.setCurrentWord}
                />,
                <ModalFile isModalOpen={isModaFilelOpen} setIsModalOpen={setIsModalFileOpen}
                            wordStore={props.wordStore} setWordStore={props.setWordStore} setCurrentWord={props.setCurrentWord}
                />,
                <PopupText isVisible={isVisible} setIsVisible={setIsVisible} setCurrentWord={props.setCurrentWord}
                            inputValue={inputValue} setInputValue={setInputValue} wordStore={props.wordStore} setWordStore={props.setWordStore}
                />
            ]}
            clickFunc={() => setIsVisible(true) }
            text={<PlusIcon/>}
            />
            <DropDownButton
            text={<TrashIcon/>}
            clickFunc={() => pop(1)}
            colorStyle="btn-blue"
            dropDowns={[
                <DropdownMenu.Item class="dropdown-item" onClick={() => pop(5)}>Pop 5 </DropdownMenu.Item>,
                <DropdownMenu.Item class="dropdown-item" onClick={() => props.setWordStore([])}>Pop All</DropdownMenu.Item>
            ]}
            popups={[]}
            />
                    <button class="btn-single btn-yellow" onClick={() => {
                        props.loadWord(props.currentWord())
                    }}
                    ><TickIcon /></button>
        </div>
    )
}
            
            
