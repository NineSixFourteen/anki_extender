import { Phrases } from "./models/Phrases";
import { updateStatus, resetStatusBar } from "../../Common/LoadingBar/lib/StatusBarContextHelper";
import { sendAudiosToAnki } from "~/lib/Send/AudioSend";
import { sendCardsToAnki } from "~/lib/Send/CardSend";

export async function sendPhrases(setStatusContext:Function, phrases:Phrases,removeId:Function) {

    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
  resetStatusBar(setStatusContext)

  const pipeline = [
    {
      condition: () => phrases.phrases.length > 0,
      then: async () => {
        await updateStatus('CheckRequest',4,'Request is good',setStatusContext,400)
        await updateStatus('SendImage',2,'No Image to send',setStatusContext,400);
        await updateStatus('SendAudio',3,"Sending Audio to Anki",setStatusContext,400)
      }, 
      else: async () => {
        await updateStatus('CheckRequest',0,'Please select some phrases first',setStatusContext,0)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendAudiosToAnki(phrases,setStatusContext),
      then: async () => {
        await updateStatus('SendAudio',4,"Audio sent succesfully",setStatusContext,800)
        await updateStatus('SendCard',3,"Sending Cards to Anki",setStatusContext,400)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendCardsToAnki(phrases,setStatusContext, removeId),
      then: async () => {
        await updateStatus('SendCard',4,"Cards sent succesfully",setStatusContext,0)
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