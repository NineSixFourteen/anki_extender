import { For } from "solid-js";
import { CardPhrase } from "./CardPhrase/CardPhrase";

interface PhraseInfo{
    SentenceEnlgish:string[],
    SentenceSpanish:string, 
    audioUrl:string
}

export default function PhrasesMain() {
  const exampleSentences:PhraseInfo[] = [
    {
        SentenceEnlgish:["It is done", "He is dead"],
        SentenceSpanish:"Se Acabo",
        audioUrl:""
    },
    {
        SentenceEnlgish:["What happend"],
        SentenceSpanish:"Que Passo",
        audioUrl:""
    },
  ]

  return (
    <main>
      <section class="list-container">
        <For each={exampleSentences}>
          {(item) => (
            <CardPhrase SentenceEnglish={item.SentenceEnlgish} SentenceSpanish={item.SentenceSpanish} audioUrl={item.audioUrl} />
          )}
        </For>
      </section>

    </main>
  );
}