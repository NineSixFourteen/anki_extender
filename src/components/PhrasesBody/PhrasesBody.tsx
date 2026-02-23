import { createSignal, For } from "solid-js";
import './PhrasesBody.css'
import { StatusBar } from "./StatusBar/StatusBar";
import {Phrases, useSentenceContext } from "~/lib/Models/SentencesContext";
import { PhrasesMain } from "./PhrasesMain/PhrasesMain";
import { ActionBar2 } from "./ActionBar/ActionBar";

export default function PhrasesBody() {

  const [selectedPhrases, setSelectedPhrases] = createSignal<Phrases>({phrases:[]});
  const [pageNum, setPageNum] = createSignal(0);
  const [displayList, setDisplayList] = createSignal();

  const { SentenceContext} = useSentenceContext();
  
  const setPage = (num:number) => {
    const min = num * 10;
    const phraseSize = SentenceContext.phrases.length;
    const max = (phraseSize > min + 10  ? min + 10 : phraseSize);
    setDisplayList(SentenceContext.phrases.slice(min,max))
  }

  return (
    <main class="pb-24">
      <ActionBar2 setPage={setPage} />
      <PhrasesMain setSelectedWords={setSelectedPhrases} displayList={displayList} pageNum={pageNum}/>

      <StatusBar selectedPhrases={selectedPhrases}  setSelectedPhrases={setSelectedPhrases} />
    </main>
  );
}