import { Component, createResource, createSignal, For} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { createPersistentStore } from '~/lib/Storage';
import InputWord from './InputWord/InputWord';
import './ActionBar.css'
import SelectLang from './SelectLang/SelectLang';
import SelectWordCount from './SelectWordCount/SelectWordCount';
import { fetchSentences } from '~/lib/Tatoeba/TatobaFetch';
import { PhraseInfo, SentenceData, TatoebaReply, useSentenceContext } from '~/lib/Models/SentencesContext';
import { convertToPhrase } from '~/lib/SendCardPipeline/PhreaseHelper';


interface ActionBarImports {
    setPage:Function
}

export const ActionBar: Component<ActionBarImports> = (props) => {

    const [word,setWord] = createSignal("");
    const [lang,setLang] = createSignal("spa");
    const [wordCount,setWordCount] = createSignal("-5");

    const { SentenceContext, setSentenceContext} = useSentenceContext();

    const [numSel, setNumSel] = createSignal(0);


    const sendRequest = async () => {
        const response = await fetchSentences(lang(), word(), wordCount() )
        setSentenceContext("phrases",convertToPhrase(response.data))
        props.setPage(0);
        setNumSel(0);
    }

    function noOfButtons(){
        const noOfPhrases = SentenceContext.phrases.length;
        const noOfButtons = noOfPhrases == 50 ? 5 : (noOfPhrases / 10) + 1;
        return Array.from({ length: noOfButtons }, (_, i) => i);
    }

  return (
    <div class="actionBar">
        <div class="actionBarInner">
            <InputWord word={word} setWord={setWord} />
            <SelectLang lang={lang} setLang={setLang}/>
            <SelectWordCount wordCount={wordCount} setWordCount={setWordCount} />
            <div class="rightSide">
                <div class='page-num-btns'>
                    <For each={noOfButtons()}>
                        {
                            (num:number) => (
                                <button onClick={() => {
                                    setNumSel(num);
                                    props.setPage(num)
                                }} class={'btn ' + (numSel() == num ? 'selected-btn' : '')}>
                                    {(num + 1) + ""}
                                </button>
                            )
                        }
                    </For>
                </div>
                <button class="send-btn" onclick={sendRequest}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
  );
};

export default ActionBar;