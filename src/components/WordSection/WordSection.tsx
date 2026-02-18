import { createSignal, createMemo, Show, Component } from "solid-js";
import { WordSearch } from "./WordSearch/WordSearch";
import { AudioZone } from "./AudioZone/AudioZone";
import { WordTarget } from "./WordTarget/WordTarget";
import { useCards } from "~/lib/Models/CardContext";

interface WordSectionImports {
    audioSearch: Function,
    setAudioSearch: Function,
    targetWord: Function,
    setTargetWord: Function,

}

export const WordSection: Component<WordSectionImports> = (props) => {

  const [audioFile, setAudioFile] = createSignal<File | null>(null);
  const [pastedUrl, setPastedUrl] = createSignal("");
  const [status, setStatus] = createSignal(""); 
  
  const { setCardStore } = useCards();


  return (
    <div class="column">
      <div class="label">AUDIO SEARCH</div>
      
      <WordSearch setSearchTerm={props.setAudioSearch} searchTerm={props.audioSearch} setStatus={setStatus} setPastedUrl={setPastedUrl} setCardStore={setCardStore} />

      <AudioZone setCardStore={setCardStore} status={status} searchTerm={props.audioSearch} 
       audioFile={audioFile} setPastedUrl={setPastedUrl}
       pastedUrl={pastedUrl} setAudioFile={setAudioFile} 
      />

      <WordTarget setCardStore={setCardStore} targetWord={props.targetWord} setTargetWord={props.setTargetWord} />

    </div>
  );
}