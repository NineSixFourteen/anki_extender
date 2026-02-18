import { Accessor, Component, createSignal, For, Show } from "solid-js";

interface HelpTextImports {
    setCardStore: Function,
    englishText: Function,
    setEnglishText:Function
}

export const HelpText: Component<HelpTextImports> = (props) => {
    
    return (
        <>
            <div class="label" style="background: #111; border-top: 1px solid #2a2a2a; font-size: 0.6rem;">
                English (OPTIONAL)
            </div>
            <textarea 
                name="frontText" 
                placeholder="Type english word or sentence idc..." 
                class="smallTextarea"
                value={props.englishText()}
                onChange={(e) => {props.setCardStore('English', e.currentTarget.value);props.setEnglishText(e.currentTarget.value)}} 
            />
        </>
    )
}