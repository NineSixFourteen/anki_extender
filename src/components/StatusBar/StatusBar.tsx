import { Component, Show } from "solid-js";
import "./Loading.css";
import { useStatusBarInfo } from "~/lib/Models/StatusContext";
import { sendCard } from "~/lib/SendCardPipeline/SendCardPipeline";
import { useCards } from '~/lib/Models/CardContext';
import './StatusBar.css'
import CardCoutner from "./CardCounter/CardCounter";

interface StatusBarImports {
    count:Function,
    setCount:Function

}

export const StatusBar: Component<StatusBarImports> = (props) => {

  const { StatusContext, setStatusContext} = useStatusBarInfo();
  const { CardStore} = useCards();
  
  function incCount(){
    let count = props.count();
    props.setCount(count + 1);
  }


  function getStatusClass(state: Number){
    switch (state) {
      case 0: return 'state-fail';
      case 3: return 'state-processing';
      case 4: return 'state-success';
      default: return 'state-idle';
    }
  };

    function getStatusText(state:Number ){
        switch (state) {
        case 0: return 'Fail';
        case 1: return 'Waiting'
        case 2: return 'Skipped'
        case 3: return 'Processing'
        case 4: return 'Success';
        default: return 'Idle';
        }
    }

  return (
    <footer class="status-footer">
      <div class="status-container">
        <CardCoutner label={"Total cards sent: "} value={props.count()} />
      
        <div class="display-container">
            <Show when={StatusContext.ShowLoading}>
                <div class="loader-container">
                    <div class="spinner"></div>
                </div>
            </Show>
            
            <h1 class="big-text">
                {StatusContext.Text + ""}
            </h1>
        </div>


        <button class="controlGroup" onClick={() => sendCard(setStatusContext, CardStore,incCount)}>
            <div class="sendButton">
                SEND ⇒
            </div>
        </button>
        
      </div>
    </footer>
  );
}