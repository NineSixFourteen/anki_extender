import { Component, createResource, createSignal, Show} from 'solid-js';
import CardCoutner from '~/components/StatusBar/CardCounter/CardCounter';
import { useStatusBarInfo } from '~/lib/Models/StatusContext';
import { sendPhrases } from '~/lib/SendCardPipeline/SendPhrasePipeline';


interface StatusBarImports {
    count:Function,
    phrases:Function

}

export const StatusBar: Component<StatusBarImports> = (props) => {

  const { StatusContext, setStatusContext} = useStatusBarInfo();

    const send = () => {
        console.log(props.phrases())
        sendPhrases(setStatusContext,props.phrases())
    }

  return (
    <footer class="status-footer">
        <div class="status-container">
            <CardCoutner label={"Total cards selected: "} value={props.count()} />
            <Show when={false}>
                <div class="loader-container">
                    <div class="spinner"></div>
                </div>
            </Show>
            <div class="display-container">
                <h1 class="big-text">
                    {StatusContext.Text + ""}
                </h1>
            </div>
            <button class="controlGroup" onClick={send}>
                <div class="sendButton">
                    SEND ⇒
                </div>
            </button>
        </div>
    </footer>
  );
};

export default StatusBar;