
import { handleResponse } from "~/components/Common/LoadingBar/lib/StatusBarContextHelper";
import { Phrases } from "~/components/PhrasesBody/lib/models/Phrases";



export async function sendCardsToAnki(phrases:Phrases,setStatusContext:Function, removeId:Function){
  const result = await sendCardsToAnkiServer(phrases);
  if(result.error){
    await handleResponse(result,'Card',setStatusContext);
    return false;
  }
  for(let id of result){
    removeId(id);
  }
  setStatusContext("ShowLoading",  false)
  setStatusContext("Text","Phrases were sent succesfully");
  setStatusContext('SendCard', 4);
}


async function sendCardsToAnkiServer(phrases:Phrases){
  "use server"
  const apiUrl = process.env.ANKI_URL || "http://127.0.0.1:8765";
  let ids = [];
  for(const data of phrases.phrases){
    const response = await fetch(apiUrl, {
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
        return result;
      } else {
        ids.push(data.id);
      }
  }
  return ids;
}

export async function sendCardToAnki(CardStore:any, setStatusContext:Function){
  const result = await sendCardToAnkiServer(CardStore);
  await handleResponse(result,'Card',setStatusContext);
  return result.error ? false : true;
}

export async function sendCardToAnkiServer(CardStore:any){
  "use server"
  const apiUrl = process.env.ANKI_URL || "http://127.0.0.1:8765";
  const response = await fetch(apiUrl, {
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

  return await response.json();
}
