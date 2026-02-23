import { createSignal, For } from "solid-js";
import './PhrasesBody.css'
import {Phrases, useSentenceContext } from "~/lib/Models/SentencesContext";
import { PhrasesMain } from "./PhrasesMain/PhrasesMain";
import { StatusBar } from "../Common/StatusBar/StatusBar";
import CardCoutner from "../Common/StatusBar/CardCounter/CardCounter";
import { useStatusBarInfo } from "~/lib/Models/StatusContext";
import { sendPhrases } from '~/lib/SendCardPipeline/SendPhrasePipeline';
import { PageBody } from "../Common/PageBody/PageBody";
import ActionBar from "../Common/ActionBar/ActionBar";
import { fetchSentences } from "~/lib/Tatoeba/TatobaFetch";
import { convertToPhrase } from "~/lib/SendCardPipeline/PhreaseHelper";
import InputWord from "./ActionBar/InputWord/InputWord";
import { GenericSelect } from "../Common/GenericSelect/GenericSelect";
import { ButtonGroup } from "./ActionBar/ButtonGroup/ButtonGroup";

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

  const [word,setWord] = createSignal("");
    const [lang,setLang] = createSignal("spa");
    const [wordCount,setWordCount] = createSignal("-5");

    const { setSentenceContext} = useSentenceContext();

    const [numSel, setNumSel] = createSignal(0);

    const sendRequest = async () => {
        const response = await fetchSentences(lang(), word(), wordCount() )
        setSentenceContext("phrases",convertToPhrase(response.data))
        setPage(0);
        setNumSel(0);
    }

  return (
    <PageBody 
      actionBar={
        <ActionBar
          leftSide={[
            <InputWord word={word} setWord={setWord} />,
            <GenericSelect label='Select Language: ' value={lang} setValue={setLang} options={[
                <option value={"spa"}>Spanish</option>,
                <option value={"eng"}>English</option>
            ]}/>,
            <GenericSelect label='Select Word Count: ' value={wordCount} setValue={setWordCount} options={[
                <option value={"-5"}>{"<5"}</option>,
                <option value={"5-"}>{">5"}</option>,
                <option value={"5-10"}>{"5-10"}</option>,
                <option value={"-10"}>{"<10"}</option>,
                <option value={"10-"}>{"10>"}</option>
            ]} />
            ]}
          rightSide={[
            <ButtonGroup setPage={setPage} sendRequest={sendRequest} numSel={numSel} setNumSel={setNumSel}  /> 
        ]} />
      }
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