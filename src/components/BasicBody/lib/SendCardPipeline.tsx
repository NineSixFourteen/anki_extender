import { sendImageToAnki } from "~/lib/Send/ImageSend";
import { updateStatus, resetStatusBar } from "../../Common/LoadingBar/lib/StatusBarContextHelper";
import { sendAudioToAnki } from "~/lib/Send/AudioSend";
import { sendCardToAnki } from "~/lib/Send/CardSend";

async function checkForMissingFields(CardStore:any, setStatusContext:Function){
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
    await updateStatus("CheckRequest",0,"Error: Missing fields -\n " + missingFieldText, setStatusContext,0);
}

export async function sendCard(setStatusContext:Function, CardStore:any, incCount:Function) {

  resetStatusBar(setStatusContext)
  let skipImage = false;

  const pipeline = [
    {
      condition: () => CardStore.Audio && CardStore.TargetWord && (CardStore.FrontText || CardStore.Image),
      then: async () => {
        await updateStatus('CheckRequest',4,'Request is good',setStatusContext,400)
      }, 
      else: async () => {
        await checkForMissingFields(CardStore, setStatusContext);
      },
      continueIfFail: false
    },
    {
      condition: () => CardStore.Image,
      then: async () => {
        await updateStatus('SendImage',3,"Sending Image to Anki",setStatusContext, 400)
      },
      else: async () => {
        skipImage = true;
        await updateStatus('SendImage',2,"Skipping Send Image",setStatusContext,200);
        await updateStatus('SendAudio',3,"Sending Audio to Anki",setStatusContext,400)
      },
      continueIfFail: true
    },
    {
      condition: async () => {if(!skipImage) { return await sendImageToAnki(CardStore,setStatusContext)};return true},
      then: async () => {
        await updateStatus('SendAudio',3,"Sending Audio to Anki",setStatusContext, 400)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendAudioToAnki(CardStore,setStatusContext),
      then:async () => {
        await updateStatus('SendCard',3,"Sending Card to Anki",setStatusContext,400)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendCardToAnki(CardStore,setStatusContext),
      then:() => {
        incCount();
      },
      continueIfFail: false
    }
  ]

  //Body that does the pipeline
  for(const stage of pipeline){
    if(await stage.condition() ){
      if(stage.then) await stage.then()
    } else {
      if(stage.else) await stage.else()
      if(!stage.continueIfFail) return;
    }
  }
}


