import { SearchIcon } from 'lucide-solid';
import { Component, createSignal, For} from 'solid-js';
import { useSentenceContext } from '~/lib/Models/SentencesContext';


interface ButtonGroupImports {
    setPage:Function,
    sendRequest:Function,
    numSel:Function,
    setNumSel:Function
}

export const ButtonGroup: Component<ButtonGroupImports> = (props) => {

    const { SentenceContext} = useSentenceContext();


    function noOfButtons(){
        const noOfPhrases = SentenceContext.phrases.length;
        const noOfButtons = noOfPhrases == 50 ? 5 : (noOfPhrases / 10) + 1;
        return Array.from({ length: noOfButtons }, (_, i) => i);
    }

  return (
    <>
        <div class='page-num-btns'>
            <For each={noOfButtons()}>
                {
                    (num:number) => (
                        <button onClick={() => {
                            props.setNumSel(num);
                            props.setPage(num)
                        }} class={'btn ' + (props.numSel() == num ? 'selected-btn' : '')}>
                            {(num + 1) + ""}
                        </button>
                    )
                }
            </For>
        </div>
        <button class="send-btn" onclick={() => props.sendRequest()}>
            <SearchIcon />
        </button>
    </>
  );
};