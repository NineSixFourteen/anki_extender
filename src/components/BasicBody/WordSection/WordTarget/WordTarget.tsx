import { Component, } from "solid-js";


interface WordTargetImports {
    setCardStore: Function,
    targetWord: Function,
    setTargetWord: Function,
}

export const WordTarget: Component<WordTargetImports> = (props) => {

    return (
        <>
            <div class="label" style="background: #111; border-top: 1px solid #2a2a2a; font-size: 0.6rem;">TARGET WORD</div>
            <textarea name="back" class="smallTextarea" placeholder="Type word..." required 
            value={props.targetWord()}
            onInput={(e) => {
                props.setCardStore('TargetWord', e.currentTarget.value);
                props.setTargetWord(e.currentTarget.value);
            }}
            onChange={(e) => {
                props.setCardStore('TargetWord', e.currentTarget.value);
                props.setTargetWord(e.currentTarget.value);
            }}/>
        </>
    )
}