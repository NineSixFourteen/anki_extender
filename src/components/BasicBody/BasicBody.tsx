import { ImageSection } from "~/components/ImageSection/ImageSection";
import { WordSection } from "~/components/WordSection/WordSection";
import { ActionBar } from '~/components/ActionBar/ActionBar'
import { HelpSection } from "~/components/HelpSection/HelpSection";
import { StatusBar } from "~/components/StatusBar/StatusBar";
import { createSignal } from "solid-js";
import { CardProvider, useCards } from "~/lib/Models/CardContext";
import { StatusProvider } from "~/lib/Models/StatusContext";

export default function BasicBody() {
  const [targetWord, setTargetWord] = createSignal<string>("");
  const [imageSearch, setImageSearch] = createSignal<string>("");
  const [audioSearch, setAudioSearch] = createSignal<string>("");

  const {setCardStore} = useCards();

  function loadWord(word:string){
    setAudioSearch(word);
    setImageSearch(word);
    setTargetWord(word);
    //Doing this one maunually because text area doesn't trigger onChange for some reason
    setCardStore('TargetWord', word);
    clearHints.clear();
    setCardStore('Hints', []);
    setCardStore('English',"");
    clearAudio.clear();
    setCardStore('Image',"");
    setCardStore('FrontText',"")
    clearImage.clear();
    setCardStore('Audio', '');
  }

  interface ref {
    clear:Function
  }
  

  let clearHints:ref = {
    clear: () => {}
  }
  let clearImage:ref = {
    clear: () => {}
  }
  let clearAudio:ref = {
    clear: () => {}
  }

  return (
    <main class="pb-24">
        <ActionBar loadWord={loadWord}/>
        <div class="main-wrapper">
            <div class="grid-container">
                <ImageSection ref={(el:any) => (clearImage = el)} imageSearch={imageSearch} setImageSearch={setImageSearch}/>
                <WordSection ref={(el:any) => (clearAudio = el)} audioSearch={audioSearch} setAudioSearch={setAudioSearch} targetWord={targetWord} setTargetWord={setTargetWord}/>
                <HelpSection ref={(el:any) => (clearHints = el)} />
            </div>
        </div>
        <StatusBar />
    </main>
  );
}