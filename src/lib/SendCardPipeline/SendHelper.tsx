import { handleResponse } from "../StatusBarContextHelper";

async function sendStoredMediaUrl(CardStore:any){
    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "storeMediaFile",
        version: 6,
        params: {
          filename: CardStore.TargetWord + ".mp3",
          url: CardStore.Audio
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
    result = await sendStoredMediaUrl(CardStore);
  } else {
    result = await sendStoredMediaData(CardStore,true);
  }
  handleResponse(result,'Audio',setStatusContext);
  return result.error ? false : true;
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
