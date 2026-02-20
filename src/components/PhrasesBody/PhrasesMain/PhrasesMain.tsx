import { For } from "solid-js";
import { CardPhrase } from "./CardPhrase/CardPhrase";
import { CardTop } from "./CardTop/CardTop";

interface PhraseInfo{
    SentenceEnlgish:string[],
    SentenceSpanish:string, 
    audioUrl:string
}

export default function PhrasesMain() {
  const exampleSentences:PhraseInfo[] = [
    {
        SentenceEnlgish:["It is done", "He is dead","FUCK YOU WANKER! SHAG A CAT!","SLAG","SLAG","sLAG"],
        SentenceSpanish:"Se Acabo PUTAAAAAAAAA AAAAAAAAA AAAAAAAA AAAAAAA AAAAA",
        audioUrl:""
    },
    {
        SentenceEnlgish:["What happend"],
        SentenceSpanish:"Que Passo",
        audioUrl:""
    },
        {
        SentenceEnlgish:["It is done", "He is dead","FUCK YOU WANKER! SHAG A CAT!","SLAG","SLAG","sLAG"],
        SentenceSpanish:"Se Acabo PUTA",
        audioUrl:""
    },
    {
        SentenceEnlgish:["What happend"],
        SentenceSpanish:"Que Passo",
        audioUrl:""
    },
        {
        SentenceEnlgish:["It is done", "He is dead","FUCK YOU WANKER! SHAG A CAT!","SLAG","SLAG","sLAG"],
        SentenceSpanish:"Se Acabo PUTA",
        audioUrl:""
    },
    {
        SentenceEnlgish:["What happend"],
        SentenceSpanish:"Que Passo",
        audioUrl:""
    },
        {
        SentenceEnlgish:["It is done", "He is dead","FUCK YOU WANKER! SHAG A CAT!","SLAG","SLAG","sLAG"],
        SentenceSpanish:"Se Acabo PUTA",
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
      <section class="main-wrapper">
        <CardTop />
        <div style={"overflow-y:auto;max-height:550px"}>
            <For each={exampleSentences}>
            {(item) => (
                <CardPhrase SentenceEnglish={item.SentenceEnlgish} SentenceSpanish={item.SentenceSpanish} audioUrl={item.audioUrl} />
            )}
            </For>
        </div>
      </section>

    </main>
  );
}