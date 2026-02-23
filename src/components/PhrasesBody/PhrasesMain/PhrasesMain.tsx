import { Component, createSignal, For, Setter } from "solid-js";
import { CardPhrase } from "./CardPhrase/CardPhrase";
import { CardTop } from "./CardTop/CardTop";
import { Phrases } from "../lib/models/Phrases";
import { useSentenceContext } from "../lib/models/SentencesContext";


interface PhrasesMainImports {
  setSelectedWords:Setter<Phrases>,
  pageNum:Function, 
  displayList:Function
}

export const PhrasesMain: Component<PhrasesMainImports> = (props) => {


  const { SentenceContext} = useSentenceContext();

  function calculateMax(){
    const min = props.pageNum()*10;
    const maxNoPhrases = SentenceContext.phrases.length; 
    return ( maxNoPhrases > min + 10 ? min + 10 : maxNoPhrases);
  }
      
  return (
    <>
      <CardTop />
      <div style={"overflow-y:auto;max-height:550px"}>
          <For each={props.displayList()}>  
          {(item) => (
              <CardPhrase phrase={item}
              setSelectedWords={props.setSelectedWords} />
          )}
          </For>
      </div>
    </>
  );
}