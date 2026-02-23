import { Accessor, Component, createResource, createSignal, Show} from 'solid-js';
import CardCoutner from '~/components/StatusBar/CardCounter/CardCounter';
import { PhraseInfo, Phrases } from '~/lib/Models/SentencesContext';
import { useStatusBarInfo } from '~/lib/Models/StatusContext';
import { sendPhrases } from '~/lib/SendCardPipeline/SendPhrasePipeline';


interface StatusBarImports {
    selectedPhrases:Accessor<Phrases>,
    setSelectedPhrases:Function

}

export const StatusBar: Component<StatusBarImports> = (props) => {

  const { StatusContext, setStatusContext} = useStatusBarInfo();

    const removeId = (id:number) => {
        props.setSelectedPhrases( (phrases:Phrases) => {return {"phrases": phrases.phrases.filter(item => item.id != id)}})
    }
    

    const send = () => {
        sendPhrases(setStatusContext,props.selectedPhrases(), removeId)
    }

  return (
    <footer class="status-footer">
        <div class="status-container">
            <CardCoutner label={"Total cards selected: "} value={props.selectedPhrases().phrases.length} />
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
