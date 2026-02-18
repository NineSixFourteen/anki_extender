import {Component, createSignal, For, Show } from "solid-js";
import './CSS/Modal.css'
import { SelectDelim } from "./SelectDelim";

interface ModalInputImports {
    isModalOpen: Function,
    setIsModalOpen: Function,
    wordStore: string[],
    setWordStore: Function,
    setCurrentWord:Function
}

export const ModalInput: Component<ModalInputImports> = (props) => {
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
            <h3>Large Input</h3>
            <textarea 
              value={text()} 
              onInput={(e) => setText(e.currentTarget.value)}
              placeholder="Enter big data here..."
            />
            <div class="modal-actions">
              <div class="leftSide">
                <SelectDelim selectedDelim={selectedDelim} setSelectedDelim={setSelectedDelim} />
              </div>
              <button class="btn-secondary" onClick={() => props.setIsModalOpen(false)}>Cancel</button>
              <button class="btn-main btn-green" onClick={() => {
                const words = GetWords();
                if(props.wordStore.length == 0 && words.length > 0){
                  props.setCurrentWord(words[0]);
                }
                for(const word of words){
                  props.setWordStore(props.wordStore.length, word);
                }
                props.setIsModalOpen(false);
              }}>Save Content</button>
            </div>
          </div>
        </div>
      </Show>
    </>
    )
}
            
            