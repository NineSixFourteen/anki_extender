import { createSignal, createMemo, Show } from "solid-js";
import { WordSearch } from "./WordSearch/WordSearch";
import { AudioZone } from "./AudioZone/AudioZone";
import { WordTarget } from "./WordTarget/WordTarget";

export function WordSection() {
  const [audioFile, setAudioFile] = createSignal<File | null>(null);
  const [pastedUrl, setPastedUrl] = createSignal("");
  const [searchTerm, setSearchTerm] = createSignal("");
  const [status, setStatus] = createSignal(""); 


  return (
    <div class="column">
      <div class="label">AUDIO SEARCH</div>
      
      <WordSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} setStatus={setStatus} setPastedUrl={setPastedUrl} />

      <AudioZone status={status} searchTerm={searchTerm} 
       audioFile={audioFile} setPastedUrl={setPastedUrl}
       pastedUrl={pastedUrl} setAudioFile={setAudioFile} 
      />

      <WordTarget />

    </div>
  );
}