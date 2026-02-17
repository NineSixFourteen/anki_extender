import { Show } from "solid-js";
import "./Loading.css";
import { useStatusBarInfo } from "~/lib/Models/StatusContext";
import { sendCard } from "~/lib/api";
import { useCards } from '~/lib/Models/CardContext';

export function StatusBar() {
  const { StatusContext, setStatusContext} = useStatusBarInfo();
  const { CardStore} = useCards();

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
        
        <div class="status-row">
          <div class={`status-segment ${getStatusClass(StatusContext.CheckRequest)}`}>Check Request: {getStatusText(StatusContext.CheckRequest)}</div>
          <div class={`status-segment ${getStatusClass(StatusContext.SendImage)}`}>Send Image: {getStatusText(StatusContext.SendImage)}</div>
          <div class={`status-segment ${getStatusClass(StatusContext.SendAudio)}`}>Send Audio: {getStatusText(StatusContext.SendAudio)}</div>
          <div class={`status-segment ${getStatusClass(StatusContext.SendCard)}`}>Send Card: {getStatusText(StatusContext.SendCard)}</div>
        </div>

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


        <button class="controlGroup" onClick={() => sendCard(setStatusContext, CardStore)}>
            <div class="sendButton">
                SEND ⇒
            </div>
        </button>
        
      </div>
    </footer>
  );
}