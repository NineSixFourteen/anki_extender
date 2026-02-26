import { PhraseInfo } from "./models/PhraseInfo";
import { SentenceData } from "./models/SentenceData";
import { TatoebaReply } from "./models/TatoebaReply";

export function convertToPhrase(data:any[]){
    return secondMap(mapToReply(data));
}

const mapToReply = (data:any[]) => {
    let array:SentenceData[] = [];
    data.forEach(
        (entry) => {
            const temp:SentenceData = 
                {
                    id: entry.id,
                    audio: [] ,
                    lang: entry.lang,
                    text: entry.text,
                    translateions: entry.translations.map(
                        (entry:any) => {
                            return {"text":entry.text}
                        }
                    )
                }
            if(temp.audio){
                array.push(temp);
            }
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
                id:entry.id,
                audioUrl: getUrl(entry.id),
                selected:false
            }
            return name; 
        }
    )
}

const getUrl = (id:number) => {return `https://audio.tatoeba.org/sentences/spa/${id}.mp3`}

