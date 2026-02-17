import { Accessor, Component, createSignal, Show } from "solid-js";

interface ImageTextImports {
    setCardStore: Function,
}

export const ImageText: Component<ImageTextImports> = (props) => {
    

    return (
        <>
            <div class="label" style="background: #111; border-top: 1px solid #2a2a2a; font-size: 0.6rem;">
                FRONT TEXT (OPTIONAL)
            </div>
            <textarea 
                name="frontText" 
                placeholder="Add context to image..." 
                class="smallTextarea"
                onChange={(e) => props.setCardStore('FrontText', e.currentTarget.value)}
            />
      </>
    )
}