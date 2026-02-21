import { Component, createResource, createSignal, Show} from 'solid-js';
import CardCoutner from '~/components/StatusBar/CardCounter/CardCounter';


interface StatusBarImports {
    count:Function

}

export const StatusBar: Component<StatusBarImports> = (props) => {

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
                    LL
                </h1>
            </div>
            <button class="controlGroup">
                <div class="sendButton">
                    SEND ⇒
                </div>
            </button>
        </div>
    </footer>
  );
};

export default StatusBar;