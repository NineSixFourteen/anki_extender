import { Phrases } from "../Models/SentencesContext";
import { handleResponse } from "../StatusBarContextHelper";

async function sendStoredMediaUrl(url:string, fileName:string){
    console.log(`URL : ${url}, FILENAME: ${fileName}`)
    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "storeMediaFile",
        version: 6,
        params: {
          filename: fileName + ".mp3",
          url: url
        }
      })
    });
    return await response.json();
}
async function sendStoredMediaData(CardStore:any, isAudio:boolean){
      const response = await fetch("http://127.0.0.1:8765", {
        method: "POST",
        body: JSON.stringify({
          action: "storeMediaFile",
          version: 6,
          params: {
            filename: CardStore.TargetWord + (isAudio ? ".mp3": ".jpg"), 
            data: isAudio ? CardStore.Audio : CardStore.Image
          }
        })
      });
    return await response.json();
}

export async function sendImageToAnki(CardStore:any,setStatusContext:Function) {
  const result = await sendStoredMediaData(CardStore,false);
  handleResponse(result,'Image',setStatusContext);
  return result.error ? false : true;
}

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

export async function sendCardsToAnki(phrases:Phrases, setStatusContext:Function){
  for(const data of phrases.phrases){
    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "addNote",
        version: 6,
        params: {
          note: {
            deckName: String("SentenceDeck"),
            modelName: "SentenceCard",
            fields: {
              Audio: `[sound:${data.id}.mp3]` || "",
              English_Sentences: String(data.SentenceEnlgish.join("\n<br />") || ""),
              Spanish_Sentence: String(data.SentenceSpanish || "")
            }
          }
        }
      })
    });
      const result = await response.json();
      if(result.error){
        handleResponse(result,'Card',setStatusContext);
        return false
      }
  }
  return  true;

}

export async function sendCardToAnki(CardStore:any,setStatusContext:Function){
  const response = await fetch("http://127.0.0.1:8765", {
    method: "POST",
    body: JSON.stringify({
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName: String(CardStore.Deck || "Default"),
          modelName: "TestCard",
          fields: {
            FrontText: String(CardStore.FrontText || ""),
            TargetWord: String(CardStore.TargetWord || ""),
            Hint_1: String(CardStore.Hints[0]? CardStore.Hints[0].text: "").toLocaleLowerCase(),
            Hint_2: String(CardStore.Hints[1]? CardStore.Hints[1].text: "").toLocaleLowerCase(),
            Hint_3: String(CardStore.Hints[2]? CardStore.Hints[2].text: "").toLocaleLowerCase(),
            Hint_4: String(CardStore.Hints[3]? CardStore.Hints[3].text: "" ).toLocaleLowerCase(),
            English: String(CardStore.English || "").toLocaleLowerCase(),
            Audio: `[sound:${CardStore.TargetWord}.mp3]` || "",
            Image: `<img src="${CardStore.TargetWord}.jpg">` || ""
          }
        }
      }
    })
  });

  const result = await response.json();
  handleResponse(result,'Card',setStatusContext);
  return result.error ? false : true;
}

function logAnki(CardStore:any) {
  console.log("Current CardStore Data:", CardStore);
  console.log("Hints:", CardStore.Hints);
  console.log("FrontText: ", CardStore.FrontText)
  console.log("Image: ", CardStore.Image)
  console.log("TargetWord: ", CardStore.TargetWord)
  console.log("Audio: ", CardStore.Audio)
  console.log("English: " + CardStore.English)
}
