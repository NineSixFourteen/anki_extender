import { Component, createSignal, For} from 'solid-js';
import InputWord from './InputWord/InputWord';
import './ActionBar.css'
import SelectLang from './SelectLang/SelectLang';
import SelectWordCount from './SelectWordCount/SelectWordCount';
import { fetchSentences } from '~/lib/Tatoeba/TatobaFetch';
import { useSentenceContext } from '~/lib/Models/SentencesContext';
import { convertToPhrase } from '~/lib/SendCardPipeline/PhreaseHelper';
import { ActionBar } from '~/components/Common/ActionBar/ActionBar';
import { ButtonGroup } from './ButtonGroup/ButtonGroup';
import { GenericSelect } from '~/components/Common/GenericSelect/GenericSelect';


interface ActionBar2Imports {
    setPage:Function
}

export const ActionBar2: Component<ActionBar2Imports> = (props) => {

    const [word,setWord] = createSignal("");
    const [lang,setLang] = createSignal("spa");
    const [wordCount,setWordCount] = createSignal("-5");

    const { setSentenceContext} = useSentenceContext();

    const [numSel, setNumSel] = createSignal(0);

    const sendRequest = async () => {
        const response = await fetchSentences(lang(), word(), wordCount() )
        setSentenceContext("phrases",convertToPhrase(response.data))
        props.setPage(0);
        setNumSel(0);
    }

  return (
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
        <ButtonGroup setPage={props.setPage} sendRequest={sendRequest} numSel={numSel} setNumSel={setNumSel}  /> 
    ]} />
  );
};