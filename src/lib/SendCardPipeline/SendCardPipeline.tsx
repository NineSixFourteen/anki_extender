import { sendAudioToAnki, sendCardToAnki, sendImageToAnki } from "./SendHelper";
import { updateStatus, resetStatusBar } from "../StatusBarContextHelper";

function checkForMissingFields(CardStore:any, setStatusContext:Function){
  let missingFields = [];
    if(!CardStore.Audio){
        missingFields.push("Audio")
    }
    if(!CardStore.TargetWord){
        missingFields.push("TargetWord")
    }
    if(!(CardStore.Image || CardStore.FrontText)){
        missingFields.push("Image or FrontText")
    }
    let missingFieldText = missingFields.join(",\n");
    updateStatus("CheckRequest",0,"Error: Missing fields -\n " + missingFieldText, setStatusContext);
}

export async function sendCard(setStatusContext:Function, CardStore:any) {

  resetStatusBar(setStatusContext)
  let skipImage = false;

  const pipeline = [
    {
      condition: () => CardStore.Audio && CardStore.TargetWord && (CardStore.FrontText || CardStore.Image),
      then: () => {
        updateStatus('CheckRequest',4,'Request is good',setStatusContext)
      }, 
      else: () => {
        checkForMissingFields(CardStore, setStatusContext);
      },
      continueIfFail: false
    },
    {
      condition: () => CardStore.Image,
      then: () => {
        updateStatus('SendImage',3,"Sending Image to Anki",setStatusContext)
      },
      else: () => {
        skipImage = true;
        updateStatus('SendImage',2,"Skipping Send Image",setStatusContext);
        updateStatus('SendAudio',3,"Sending Audio to Anki",setStatusContext)
      },
      continueIfFail: true
    },
    {
      condition: async () => {if(!skipImage) { return await sendImageToAnki(CardStore,setStatusContext)};return true},
      then: () => {
        updateStatus('SendAudio',3,"Sending Audio to Anki",setStatusContext)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendAudioToAnki(CardStore,setStatusContext),
      then: () => {
        updateStatus('SendCard',3,"Sending Card to Anki",setStatusContext)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendCardToAnki(CardStore,setStatusContext),
      continueIfFail: false
    }
  ]

  //Body that does the pipeline
  for(const stage of pipeline){
    if(await stage.condition() ){
      if(stage.then) stage.then()
    } else {
      if(stage.else)stage.else()
      if(!stage.continueIfFail) return;
    }
  }
}


