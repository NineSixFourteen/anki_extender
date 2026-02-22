import { Component, createResource, createSignal, Show} from 'solid-js';
import CardCoutner from '~/components/StatusBar/CardCounter/CardCounter';
import { PhraseInfo, Phrases } from '~/lib/Models/SentencesContext';
import { useStatusBarInfo } from '~/lib/Models/StatusContext';
import { sendPhrases } from '~/lib/SendCardPipeline/SendPhrasePipeline';


interface StatusBarImports {
    count:Function,
    setCount:Function,
    phrases:Function,
    setSelectedPhrases:Function

}

export const StatusBar: Component<StatusBarImports> = (props) => {

  const { StatusContext, setStatusContext} = useStatusBarInfo();

    const removeId = (id:number) => {
        console.log(props.phrases())
        props.setSelectedPhrases({"phrases": (phrases:PhraseInfo[]) => {
            phrases.filter(
                (phrase) => phrase.id != id
            )
        }});
        props.setCount((co:number) => co -1 );
        console.log(props.phrases())
    }

    const send = () => {
        sendPhrases(setStatusContext,props.phrases(), removeId)
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
