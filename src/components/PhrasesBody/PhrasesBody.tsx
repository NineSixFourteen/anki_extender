import { createSignal, For } from "solid-js";
import './PhrasesBody.css'
import ActionBar from "./ActionBar/ActionBar";
import { StatusBar } from "./StatusBar/StatusBar";
import LoadingBar from "../LoadingBar/LoadingBar";
import { SentenceProvider, Phrases } from "~/lib/Models/SentencesContext";
import { StatusProvider, useStatusBarInfo } from "~/lib/Models/StatusContext";
import { createStore } from "solid-js/store";
import { PhrasesMain } from "./PhrasesMain/PhrasesMain";

export default function PhrasesBody() {

  const [count, setCount] = createSignal(0);
  const [selectedPhrases, setSelectedPhrases] = createSignal<Phrases>({phrases:[]});

  const incCount = () => {
    setCount(count() + 1)
  }

  return (
    <SentenceProvider>
      <StatusProvider>
        <main class="pb-24">
          <ActionBar />
          <PhrasesMain setSelectedWords={setSelectedPhrases} incCount={incCount} />

          <StatusBar count={count} phrases={selectedPhrases}/>
        </main>
      </StatusProvider>
    </SentenceProvider>
  );
}