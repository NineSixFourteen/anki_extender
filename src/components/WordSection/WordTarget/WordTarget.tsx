import { Component, } from "solid-js";

export const WordTarget: Component = () => {

    return (
        <>
            <div class="label" style="background: #111; border-top: 1px solid #2a2a2a; font-size: 0.6rem;">TARGET WORD</div>
            <textarea name="back" class="smallTextarea" placeholder="Type word..." required />
        </>
    )
}