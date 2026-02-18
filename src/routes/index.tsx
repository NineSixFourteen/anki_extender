import { ImageSection } from "~/components/ImageSection/ImageSection";
import { WordSection } from "~/components/WordSection/WordSection";
import { Navbar } from '~/components/Navbar/Navbar';
import { ActionBar } from '~/components/ActionBar/ActionBar'
import { HelpSection } from "~/components/HelpSection/HelpSection";
import { StatusBar } from "~/components/StatusBar/StatusBar";
import { createSignal } from "solid-js";
import { useCards } from "~/lib/Models/CardContext";

export default function Home() {
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
  }

  return (
    <main class="pb-24">
      <Navbar />
      <ActionBar loadWord={loadWord}/>
      <div class="main-wrapper">
          <div class="grid-container">
            <ImageSection imageSearch={imageSearch} setImageSearch={setImageSearch}/>
            <WordSection audioSearch={audioSearch} setAudioSearch={setAudioSearch} targetWord={targetWord} setTargetWord={setTargetWord}/>
            <HelpSection />
          </div>
      </div>
      <StatusBar />
    </main>
  );
}