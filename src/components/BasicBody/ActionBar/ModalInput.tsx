import {Component, createSignal} from "solid-js";
import { GenericSelect } from "../../Common/GenericSelect/GenericSelect";
import { GenericModal } from "~/components/Common/GenericModal/GenericModal";

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
      <GenericModal 
        isModalOpen={props.isModalOpen}
        setIsModalOpen={props.setIsModalOpen}
        wordStore={props.wordStore}
        setWordStore={props.setWordStore}
        setCurrentWord={props.setCurrentWord}
        title={<h3>Large Input</h3>}
        body={[
          <textarea 
            value={text()} 
            onInput={(e) => setText(e.currentTarget.value)}
            placeholder="Enter big data here..."
          />]}
        actions={[
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
          </div>,
          <button class="btn-secondary" onClick={() => props.setIsModalOpen(false)}>Cancel</button>,
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
        ]}
      />
    )
}
            
            