import { Component, JSXElement, Show } from "solid-js";
import { useStatusBarInfo } from "~/lib/Models/StatusContext";
import './StatusBar.css'

interface StatusBarImports {
    send:any,
    cardCounter:JSXElement

}

export const StatusBar: Component<StatusBarImports> = (props) => {

  const { StatusContext} = useStatusBarInfo();
  

  return (
    <footer class="status-footer">
      <div class="status-container">
        {props.cardCounter}
      
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

        <button class="controlGroup" onClick={props.send}>
            <div class="sendButton">
                SEND ⇒
            </div>
        </button>
        
      </div>
    </footer>
  );
}