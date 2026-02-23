import { Phrases } from "../Models/SentencesContext";
import { sendAudiosToAnki, sendCardsToAnki, sendCardToAnki } from "./SendHelper";
import { updateStatus, resetStatusBar } from "../StatusBarContextHelper";

export async function sendPhrases(setStatusContext:Function, phrases:Phrases,removeId:Function) {

    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
  resetStatusBar(setStatusContext)

  const pipeline = [
    {
      condition: () => phrases.phrases.length > 0,
      then: async () => {
        updateStatus('CheckRequest',4,'Request is good',setStatusContext)
        await wait(1200)
        updateStatus('SendImage',2,'No Image to send',setStatusContext);
        await wait(800)
        updateStatus('SendAudio',3,"Sending Audio to Anki",setStatusContext)
        await wait(400)
      }, 
      else: () => {
        updateStatus('CheckRequest',0,'Please select some phrases first',setStatusContext)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendAudiosToAnki(phrases,setStatusContext),
      then: async () => {
        updateStatus('SendAudio',4,"Audio sent succesfully",setStatusContext)
        await wait(1200)
        updateStatus('SendCard',3,"Sending Cards to Anki",setStatusContext)
        await wait(400)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendCardsToAnki(phrases,setStatusContext, removeId),
      then: () => {
        updateStatus('SendCard',4,"Cards sent succesfully",setStatusContext)
      },
      continueIfFail: false
    }
  ]

  //Body that does the pipeline
  for(const stage of pipeline){
    if(await stage.condition() ){
      if(stage.then) await stage.then()
    } else {
      if(stage.else)stage.else()
      if(!stage.continueIfFail) return;
    }
  }
}