            
import { Component, Show } from "solid-js";

interface PopupTextImports {
    isVisible: Function,
    setIsVisible: Function,
    setCurrentWord: Function
    inputValue: Function, 
    setInputValue:Function,
    wordStore:string[],
    setWordStore:Function

}
export const PopupText: Component<PopupTextImports> = (props) => {


    return (
        <Show when={props.isVisible()}>
            <div class="input-popup">
                <textarea
                    value={props.inputValue()}
                    onInput={(e) => props.setInputValue(e.currentTarget.value)}
                    placeholder="Type something..."
                    autofocus
                />
                <div class="popup-footer">
                    <span>Character count: {props.inputValue().length}</span>
                    <div>
                        <button onClick={() => props.setInputValue("")}>Clear</button>
                        <Show when={props.inputValue().length == 0}>
                            <button onClick={() => props.setIsVisible(false)}>Close</button>
                        </Show>
                        <Show when={props.inputValue().length != 0}>
                            <button onClick={() => {
                                if(props.wordStore.length == 0 && props.inputValue().length > 0){
                                    props.setCurrentWord(props.inputValue);
                                }
                                if(props.inputValue().length > 0){
                                    props.setWordStore(props.wordStore.length, props.inputValue);
                                }
                                props.setInputValue("")
                                props.setIsVisible(false)
                            }}>Add</button>
                        </Show>
                    </div>
                </div>
            </div>
        </Show>
    )
}
            
            





