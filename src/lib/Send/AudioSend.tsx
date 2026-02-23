import { handleResponse } from "~/components/Common/LoadingBar/lib/StatusBarContextHelper";
import { Phrases } from "~/components/PhrasesBody/lib/models/Phrases";
import { sendStoredMediaUrl, sendStoredMediaData} from './common';


export async function sendAudioToAnki(CardStore:any,setStatusContext:Function){    
  let result;
  if(CardStore.Audio.startsWith("http") || CardStore.Audio.startsWith("https")){
    result = await sendStoredMediaUrl(CardStore.Audio,CardStore.TargetWord);
  } else {
    result = await sendStoredMediaData(CardStore,true);
  }
  handleResponse(result,'Audio',setStatusContext);
  return result.error ? false : true;
}


export async function sendAudiosToAnki(phrases:Phrases,setStatusContext:Function){    
  for(const data of phrases.phrases){
    const result = await sendStoredMediaUrl(data.audioUrl,data.id+"");
    if(result.error){
        handleResponse(result,'Audio',setStatusContext);
        return false
    }
  }
  return true;
}
