import { Component, For, Setter } from "solid-js";
import { CardPhrase } from "./CardPhrase/CardPhrase";
import { CardTop } from "./CardTop/CardTop";
import { Phrases, useSentenceContext } from "~/lib/Models/SentencesContext";
import { useStatusBarInfo } from "~/lib/Models/StatusContext";
import LoadingBar from "~/components/LoadingBar/LoadingBar";


interface PhrasesMainImports {
  setSelectedWords:Setter<Phrases>,
  incCount:Function
}

export const PhrasesMain: Component<PhrasesMainImports> = (props) => {

  const { StatusContext} = useStatusBarInfo();

  const { SentenceContext} = useSentenceContext();
      
  return (
    <main>
      <section class="main-wrapper">
        <CardTop />
        <div style={"overflow-y:auto;max-height:550px"}>
            <For each={SentenceContext.phrases}>  
            {(item) => (
                <CardPhrase phrase={item}
                setSelectedWords={props.setSelectedWords} incCount={props.incCount} />
            )}
            </For>
        </div>
      </section>
      <LoadingBar status={[StatusContext.CheckRequest,StatusContext.SendImage,StatusContext.SendAudio,StatusContext.SendCard]} />
    </main>
  );
}