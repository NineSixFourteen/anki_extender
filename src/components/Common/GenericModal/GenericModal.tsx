import {Component, createSignal, For, JSXElement, Show } from "solid-js";
import { GenericSelect } from "../../Common/GenericSelect/GenericSelect";
import './Modal.css'

interface GenericModalImports {
    isModalOpen: Function,
    setIsModalOpen: Function,
    wordStore: string[],
    setWordStore: Function,
    setCurrentWord:Function,
    title: JSXElement,
    body: JSXElement[],
    actions: JSXElement[]
}

export const GenericModal: Component<GenericModalImports> = (props) => {
    const [text, setText] = createSignal("");
    const [selectedDelim, setSelectedDelim] = createSignal(",");

    function GetWords(){
      return text().split(selectedDelim());
    }
    
    return (
    <>
      <Show when={props.isModalOpen()}>
        <div class="modal-overlay" onClick={() => props.setIsModalOpen(false)}>
          
          <div class="modal-content" onClick={(e) => e.stopPropagation()}>
            {props.title}
            <For each={props.body}>
                {(element) => element}
            </For>
            <div class="modal-actions">
                <For each={props.actions}>
                    {(element) => element}
                </For>
            </div>
          </div>
        </div>
      </Show>
    </>
    )
}
            
            