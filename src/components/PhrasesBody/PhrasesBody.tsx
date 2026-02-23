import { createSignal, For } from "solid-js";
import './PhrasesBody.css'
import {Phrases, useSentenceContext } from "~/lib/Models/SentencesContext";
import { PhrasesMain } from "./PhrasesMain/PhrasesMain";
import { ActionBar2 } from "./ActionBar/ActionBar";
import { StatusBar } from "../Common/StatusBar/StatusBar";
import CardCoutner from "../Common/StatusBar/CardCounter/CardCounter";
import { useStatusBarInfo } from "~/lib/Models/StatusContext";
import { sendPhrases } from '~/lib/SendCardPipeline/SendPhrasePipeline';
import { PageBody } from "../Common/PageBody/PageBody";

export default function PhrasesBody() {

  const [selectedPhrases, setSelectedPhrases] = createSignal<Phrases>({phrases:[]});
  const [pageNum, setPageNum] = createSignal(0);
  const [displayList, setDisplayList] = createSignal();

  const { SentenceContext} = useSentenceContext();
  const { setStatusContext} = useStatusBarInfo();
  
  
  const setPage = (num:number) => {
    const min = num * 10;
    const phraseSize = SentenceContext.phrases.length;
    const max = (phraseSize > min + 10  ? min + 10 : phraseSize);
    setDisplayList(SentenceContext.phrases.slice(min,max))
  }

  const removedId = (id:number) => setSelectedPhrases( (phrases:Phrases) => {return {"phrases": phrases.phrases.filter(item => item.id != id)}})

  return (
    <PageBody 
      actionBar={ <ActionBar2 setPage={setPage} />}
      mainBody={[
        <PhrasesMain setSelectedWords={setSelectedPhrases} displayList={displayList} pageNum={pageNum}/>
      ]}
      statusBar={
      <StatusBar 
        send={()=> sendPhrases(setStatusContext,selectedPhrases(), removedId)} 
        cardCounter={
          <CardCoutner label={"Total cards selected: "} value={selectedPhrases().phrases.length} />
        } 
      />
      }
    />
  );
}