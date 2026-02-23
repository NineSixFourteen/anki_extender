import {Component, createSignal, For, Show } from "solid-js";
import './CSS/Modal.css'
import { GenericSelect } from "../Common/GenericSelect/GenericSelect";

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
                <GenericSelect label="Delimiter:" value={selectedDelim} setValue={setSelectedDelim} options={[
                    <option value=",">Comma: ,</option>,
                    <option value="|">Pipe/OR: |,</option>,
                    <option value="&">AND: &</option>,
                    <option value=".">Dot: .</option>,
                    <option value="%">REM: %</option>,
                    <option value="*">MUL: *</option>,
                    <option value=":">Colon: :</option>,
                    <option value=";">SemiColon: ;</option>,
                    <option value="Custom:">Custom: </option>,
                ]} />
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
            
            