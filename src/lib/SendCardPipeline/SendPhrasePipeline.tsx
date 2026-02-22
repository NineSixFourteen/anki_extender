import { Phrases } from "../Models/SentencesContext";
import { sendAudiosToAnki, sendCardsToAnki, sendCardToAnki } from "./SendHelper";
import { updateStatus, resetStatusBar } from "../StatusBarContextHelper";

export async function sendPhrases(setStatusContext:Function, phrases:Phrases) {

  resetStatusBar(setStatusContext)
  let skipImage = false;

  const pipeline = [
    {
      condition: () => phrases.phrases.length > 0,
      then: () => {
        updateStatus('CheckRequest',4,'Request is good',setStatusContext)
        updateStatus('SendImage',2,'',setStatusContext);
      }, 
      else: () => {
        updateStatus('CheckRequest',0,'Please select some phrases first',setStatusContext)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendAudiosToAnki(phrases,setStatusContext),
      then: () => {
        updateStatus('SendCard',3,"Sending Cards to Anki",setStatusContext)
      },
      continueIfFail: false
    },
    {
      condition: async () => await sendCardsToAnki(phrases,setStatusContext),
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