import { ImageSection } from "~/components/ImageSection/ImageSection";
import { WordSection } from "~/components/WordSection/WordSection";
import { ActionBar2 } from '~/components/ActionBar/ActionBar'
import { HelpSection } from "~/components/HelpSection/HelpSection";
import { sendCard } from "~/lib/SendCardPipeline/SendCardPipeline";
import { createSignal } from "solid-js";
import { CardProvider, useCards } from "~/lib/Models/CardContext";
import { StatusProvider, useStatusBarInfo } from "~/lib/Models/StatusContext";
import LoadingBar from "../LoadingBar/LoadingBar";
import { StatusBar } from "../Common/StatusBar/StatusBar";
import CardCoutner from "../StatusBar/CardCounter/CardCounter";
import { PageBody } from "../Common/PageBody/PageBody";

export default function BasicBody() {
  const [targetWord, setTargetWord] = createSignal<string>("");
  const [imageSearch, setImageSearch] = createSignal<string>("");
  const [audioSearch, setAudioSearch] = createSignal<string>("");
  const [count, setCount] = createSignal<number>(0);
  
  const {setStatusContext} = useStatusBarInfo();

  const {CardStore, setCardStore} = useCards();

  function loadWord(word:string){
    setAudioSearch(word);
    setImageSearch(word);
    setTargetWord(word);
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
    <PageBody 
      actionBar={<ActionBar2 loadWord={loadWord}/>}
      mainBody={[
          <div class="grid-container">
            <ImageSection ref={(el:any) => (clearImage = el)} imageSearch={imageSearch} setImageSearch={setImageSearch}/>
            <WordSection ref={(el:any) => (clearAudio = el)} audioSearch={audioSearch} 
                         setAudioSearch={setAudioSearch} targetWord={targetWord} setTargetWord={setTargetWord}/>
            <HelpSection ref={(el:any) => (clearHints = el)} />
          </div>
      ]}
      statusBar={
        <StatusBar 
          send={() => sendCard(setStatusContext, CardStore,() => setCount((count:number) => count + 1))}
          cardCounter={
            <CardCoutner label={"Total cards sent: "} value={count()} />
          }
        />
      }
    />
  );
}