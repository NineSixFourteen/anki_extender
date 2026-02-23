import { Component, createSignal, For, Setter } from "solid-js";
import { CardPhrase } from "./CardPhrase/CardPhrase";
import { CardTop } from "./CardTop/CardTop";
import { Phrases, useSentenceContext } from "~/lib/Models/SentencesContext";
import { useStatusBarInfo } from "~/lib/Models/StatusContext";
import LoadingBar from "~/components/LoadingBar/LoadingBar";


interface PhrasesMainImports {
  setSelectedWords:Setter<Phrases>,
  pageNum:Function, 
  displayList:Function
}

export const PhrasesMain: Component<PhrasesMainImports> = (props) => {

  const { StatusContext} = useStatusBarInfo();

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