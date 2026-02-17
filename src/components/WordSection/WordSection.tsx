import { createSignal, createMemo, Show } from "solid-js";
import { WordSearch } from "./WordSearch/WordSearch";
import { AudioZone } from "./AudioZone/AudioZone";
import { WordTarget } from "./WordTarget/WordTarget";
import { useCards } from "~/lib/Models/CardContext";

export function WordSection() {
  const [audioFile, setAudioFile] = createSignal<File | null>(null);
  const [pastedUrl, setPastedUrl] = createSignal("");
  const [searchTerm, setSearchTerm] = createSignal("");
  const [status, setStatus] = createSignal(""); 
  
  const { setCardStore } = useCards();


  return (
    <div class="column">
      <div class="label">AUDIO SEARCH</div>
      
      <WordSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} setStatus={setStatus} setPastedUrl={setPastedUrl} setCardStore={setCardStore} />

      <AudioZone setCardStore={setCardStore} status={status} searchTerm={searchTerm} 
       audioFile={audioFile} setPastedUrl={setPastedUrl}
       pastedUrl={pastedUrl} setAudioFile={setAudioFile} 
      />

      <WordTarget setCardStore={setCardStore} />

    </div>
  );
}