import { Accessor, Component, createSignal, For, Show } from "solid-js";
import styles from '../OptionSection.module.css';

interface OptionsTestImports {
    setCardStore: Function,

}

export const OptionText: Component<OptionsTestImports> = (props) => {
    
 
    return (
        <>
            <div class="label" style="background: #111; border-top: 1px solid #2a2a2a; font-size: 0.6rem;">
                English (OPTIONAL)
            </div>
            <textarea 
                name="frontText" 
                placeholder="Type english word or sentence idc..." 
                class="smallTextarea"
            />
        </>
    )
}