import { For } from "solid-js";
import './PhrasesBody.css'
import ActionBar from "./ActionBar/ActionBar";
import PhrasesMain from "./PhrasesMain/PhrasesMain";

export default function PhrasesBody() {
  const exampleSentences = [1, 2, 3, 4, 5];

  return (
    <main>
    <ActionBar />
    <PhrasesMain />

    </main>
  );
}