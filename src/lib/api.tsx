
function updateStatus(field:any, status:number,text:string, setStatusContext:Function){
  setStatusContext("ShowLoading", status === 3)
  setStatusContext("Text",text);
  setStatusContext(field, status);
}

export async function fetchAnkiDecks() {
  try{
    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "deckNames",
        version: 6
      })
    });
    const json = await response.json();
    if (json.error) throw new Error(json.error);
    //Cringe sort 
    const decks = json.result as string[];
    return decks.sort((a, b) => {
      if (a === "Default") return -1; // a comes first
      if (b === "Default") return 1;  // b comes first
      return a.localeCompare(b)
    });
  } catch (err) {
    throw new Error("Anki connection refused. Is Anki running?");
  }
}

function handleResponse(result:any, field:string, setStatusContext:Function){
  if (result.error) {
    updateStatus(
      field == 'Image' ? "SendImage" : field == 'Audio' ? 'SendAudio' : 'SendCard', 
      0, 
      "Error: " + result.error,
      setStatusContext
    )
  } else {
    updateStatus(
      field == 'Image' ? "SendImage" : field == 'Audio' ? 'SendAudio' : 'SendCard',
      4,
      "Success: " + field + " saved as "+  result.result,
      setStatusContext
    )
    console.log("Success! " + field + " saved as:", result.result); 
  }
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

function resetStatusBar(setStatusContext:Function){
  setStatusContext(
    {
      CheckRequest: 1,  
      SendImage : 1, 
      SendAudio: 1, 
      SendCard: 1, 
      ShowLoading: false,
      Text: "Starting" 
    }
  )

}

export async function sendCard(setStatusContext:Function, CardStore:any) {

  let missingFields = [];
  resetStatusBar(setStatusContext)
  if(CardStore.Audio && CardStore.TargetWord && (CardStore.FrontText || CardStore.Image)){
    updateStatus('CheckRequest',4,'Request is good',setStatusContext)
    if(CardStore.Image){
      updateStatus('SendImage',3,"Sending Image to Anki",setStatusContext)
      sendImageToAnki(CardStore,setStatusContext);
    } else {
      updateStatus('SendImage',2,"Skipping Send Image",setStatusContext)
    }
    updateStatus('SendAudio',3,"Sending Audio to Anki",setStatusContext)
    sendAudioToAnki(CardStore,setStatusContext);
    updateStatus('SendAudio',3,"Sending Card to Anki",setStatusContext)
    sendCardsToAnki(CardStore,setStatusContext);
  } else {
    if(!CardStore.Audio){
        missingFields.push("Audio")
    }
    if(!CardStore.TargetWord){
        missingFields.push("TargetWord")
    }
    if(!(CardStore.Image || CardStore.FrontText)){
        missingFields.push("Image or FrontText")
    }
    setStatusContext("CheckRequest",0);
    let missingFieldText = missingFields.join(",\n");
    setStatusContext("Text","Error: Missing fields -\n " + missingFieldText);
  }
}


async function sendImageToAnki(CardStore:any,setStatusContext:Function) {
  const response = await fetch("http://127.0.0.1:8765", {
    method: "POST",
    body: JSON.stringify({
      action: "storeMediaFile",
      version: 6,
      params: {
        filename: CardStore.TargetWord + ".jpg", 
        data: CardStore.Image   
      }
    })
  });
  const result = await response.json();
  handleResponse(result,'Image',setStatusContext);
}

async function sendAudioToAnki(CardStore:any,setStatusContext:Function){    
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
  
  const result = await response.json();
  handleResponse(result,'Audio',setStatusContext);
}

async function sendCardsToAnki(CardStore:any,setStatusContext:Function){
  console.log(`[sound:${CardStore.TargetWord}.mp3]`);
  console.log(`<img src="${CardStore.TargetWord}.jpg">`)
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
            Hint_1: String(CardStore.Hints[0] || ""),
            Hint_2: String(CardStore.Hints[1] || ""),
            Hint_3: String(CardStore.Hints[2] || ""),
            Hint_4: String(CardStore.Hints[3] || ""),
            English: String(CardStore.English || ""),
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