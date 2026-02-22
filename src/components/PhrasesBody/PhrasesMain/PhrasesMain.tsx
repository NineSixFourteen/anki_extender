import { For } from "solid-js";
import { CardPhrase } from "./CardPhrase/CardPhrase";
import { CardTop } from "./CardTop/CardTop";
import { useSentenceContext } from "~/lib/Models/SentencesContext";



export default function PhrasesMain() {
const { SentenceContext} = useSentenceContext();
    
  return (
    <main>
      <section class="main-wrapper">
        <CardTop />
        <div style={"overflow-y:auto;max-height:550px"}>
            <For each={SentenceContext.phrases}>  
            {(item) => (
                <CardPhrase SentenceEnglish={item.SentenceEnlgish} SentenceSpanish={item.SentenceSpanish} audioUrl={item.audioUrl} />
            )}
            </For>
        </div>
      </section>

    </main>
  );
}