import { createSignal, For } from "solid-js";
import './PhrasesBody.css'
import ActionBar from "./ActionBar/ActionBar";
import PhrasesMain from "./PhrasesMain/PhrasesMain";
import { StatusBar } from "./StatusBar/StatusBar";
import LoadingBar from "../LoadingBar/LoadingBar";
import { SentenceProvider } from "~/lib/Models/SentencesContext";

export default function PhrasesBody() {

  const [count, setCount] = createSignal(0);

  return (
    <SentenceProvider>
      <main class="pb-24">
        <ActionBar />
        <PhrasesMain />
        <LoadingBar status={[0,0,0,0]}/>
        <StatusBar count={count} />
      </main>
    </SentenceProvider>
  );
}