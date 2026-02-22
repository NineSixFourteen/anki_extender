import { Component, createResource, createSignal} from 'solid-js';
import { useCards } from '~/lib/Models/CardContext';
import { createPersistentStore } from '~/lib/Storage';
import InputWord from './InputWord/InputWord';
import './ActionBar.css'
import SelectLang from './SelectLang/SelectLang';
import SelectWordCount from './SelectWordCount/SelectWordCount';
import { fetchSentences } from '~/lib/Tatoeba/TatobaFetch';
import { PhraseInfo, SentenceData, TatoebaReply, useSentenceContext } from '~/lib/Models/SentencesContext';


interface ActionBarImports {

}

export const ActionBar: Component<ActionBarImports> = (props) => {

    const [word,setWord] = createSignal("");
    const [lang,setLang] = createSignal("spa");
    const [wordCount,setWordCount] = createSignal("-5");

    const { SentenceContext, setSentenceContext} = useSentenceContext();

    const mapToReply = (data:any[]) => {
        let array:SentenceData[] = [];
        data.forEach(
            (entry) => {
                const temp:SentenceData = 
                    {
                        id: entry.id,
                        audio:[],
                        lang: entry.lang,
                        text: entry.text,
                        translateions: entry.translations.map(
                            (entry:any) => {
                                console.log(entry)
                                return {"text":entry.text}
                            }
                        )
                    }
                array.push(temp);
            }
        )
        const dumb:TatoebaReply = {"sentencs": array}
        return dumb;
    }

    const secondMap = (reply:TatoebaReply) => {
            return reply.sentencs.map(
                (entry) => {
                    const name:PhraseInfo = {
                        SentenceEnlgish:entry.translateions.map((e) => e.text),
                        SentenceSpanish:entry.text,
                        audioUrl:""
                    }
                    return name; 
                }
            )
        }


    const sendRequest = async () => {
        const response = await fetchSentences(lang(), word(), wordCount() )
        console.log(response.data)
        setSentenceContext("phrases",secondMap(mapToReply(response.data)))
        console.log(SentenceContext.phrases)
    }

  return (
    <div class="actionBar">
        <div class="actionBarInner">
            <InputWord word={word} setWord={setWord} />
            <SelectLang lang={lang} setLang={setLang}/>
            <SelectWordCount wordCount={wordCount} setWordCount={setWordCount} />
            <div class="rightSide">
                <button class="check-btn" onclick={sendRequest}>
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