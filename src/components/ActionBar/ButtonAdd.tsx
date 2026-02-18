
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Component, createSignal, Show} from "solid-js";
import { PlusIcon } from "./Icons";
import { ChevronDown } from "lucide-solid";
import { ModalInput } from "./ModalInput";
import ModalFile from "./ModalFile";


interface ButtonAddImports {
    setWordStore: Function,
    wordStore: string[],

}

export const ButtonAdd: Component<ButtonAddImports> = (props) => {
    
    const [isVisible, setIsVisible] = createSignal(false);
    const [inputValue, setInputValue] = createSignal("");
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    const [isModaFilelOpen, setIsModalFileOpen] = createSignal(false);

    return (
        <DropdownMenu placement='bottom-end'>
            <div class="button-group">
                <div class="split-btn-wrapper">
                    <div class="relative-container">
                        <button 
                            class="btn-main btn-green" 
                            onClick={() => setIsVisible(true)}
                        > <PlusIcon/> </button>

                        <ModalInput isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                    wordStore={props.wordStore} setWordStore={props.setWordStore}
                        />
                        <ModalFile isModalOpen={isModaFilelOpen} setIsModalOpen={setIsModalFileOpen}
                                    wordStore={props.wordStore} setWordStore={props.setWordStore}
                        />
                        <Show when={isVisible()}>
                            <div class="input-popup">
                                <textarea
                                    value={inputValue()}
                                    onInput={(e) => setInputValue(e.currentTarget.value)}
                                    placeholder="Type something..."
                                    autofocus
                                />
                                <div class="popup-footer">
                                    <span>Character count: {inputValue().length}</span>
                                    <div>
                                        <button onClick={() => setInputValue("")}>Clear</button>
                                        <Show when={inputValue().length == 0}>
                                            <button onClick={() => setIsVisible(false)}>Close</button>
                                        </Show>
                                        <Show when={inputValue().length != 0}>
                                            <button onClick={() => {
                                                props.setWordStore(props.wordStore.length, inputValue);
                                                setInputValue("")
                                                setIsVisible(false)
                                            }}>Add</button>
                                        </Show>
                                    </div>
                                </div>
                            </div>
                        </Show>
                    </div>
                    <DropdownMenu.Trigger class="btn-arrow btn-green">
                    <ChevronDown size={14} strokeWidth={3} />
                    </DropdownMenu.Trigger>
                </div>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content class="dropdown-content">
                    <DropdownMenu.Item class="dropdown-item" onClick={() => setIsModalOpen(true)} >Add Multiple </DropdownMenu.Item>
                    <DropdownMenu.Item class="dropdown-item" onClick={() => setIsModalFileOpen(true)}>Import from CSV</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </div>
        </DropdownMenu>
    )
}
