import { ImageSection } from "~/components/BasicBody/ImageSection/ImageSection";
import { WordSection } from "~/components/BasicBody/WordSection/WordSection";
import { HelpSection } from "~/components/BasicBody/HelpSection/HelpSection";
import { sendCard } from "~/components/BasicBody/lib/SendCardPipeline";
import { createResource, createSignal, For } from "solid-js";
import { useCards } from "./lib/CardContext"
import { useStatusBarInfo } from "~/components/Common/LoadingBar/lib/StatusContext";
import { StatusBar } from "../Common/StatusBar/StatusBar";
import CardCoutner from "../Common/StatusBar/CardCounter/CardCounter";
import { PageBody } from "../Common/PageBody/PageBody";
import { GenericSelect } from "../Common/GenericSelect/GenericSelect";
import ActionBar from "../Common/ActionBar/ActionBar";
import { fetchAnkiDecks } from "~/lib/Fetch/AnkiFetch";
import { createPersistentStore } from "~/lib/Storage/Storage";
import { ButtonGroup } from "./ActionBar/ButtonGroup";

export default function BasicBody() {
  const [targetWord, setTargetWord] = createSignal<string>("");
  const [imageSearch, setImageSearch] = createSignal<string>("");
  const [audioSearch, setAudioSearch] = createSignal<string>("");
  const [count, setCount] = createSignal<number>(0);
  const [decks] = createResource(fetchAnkiDecks);
  const [wordStore, setWordStore] = createPersistentStore<string[]>("store",[]);
  const [currentWord, setCurrentWord] = createSignal("");


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
  
  function updateDeck(value:string){
    setCardStore("Deck", value)
  }

  const getDecks = () => {
    if(decks){
      return decks;
    } else {
      return () => "Default"
    }
  }

  const getCurrentWord = () => {
    if(currentWord){
      return currentWord;
    } else {
      return () => "Press the + button to add a word"
    }
  }

  return (
    <PageBody 
      actionBar={
            <ActionBar
              leftSide={[<GenericSelect label='Target Deck'value={getDecks} setValue={updateDeck} options={[
                <For each={decks()}>
                    {(deckName:string) => (
                    <option value={deckName}>{deckName}</option>
                    )}
                </For>
              ]} />]}
              rightSide={[
                    <GenericSelect label='Word List'  value={getCurrentWord} setValue={setCurrentWord} options={[
                      <For each={wordStore.length > 0 ? wordStore : ["Press the + button to add a word"] }>
                          {
                              (word) => (<option value={word}>{word}</option>)
                          }
                      </For>]
                    }  />,
                    <ButtonGroup wordStore={wordStore} setWordStore={setWordStore} currentWord={currentWord} setCurrentWord={setCurrentWord} loadWord={loadWord} />
            ]} />
      }
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