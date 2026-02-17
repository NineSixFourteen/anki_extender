import { Accessor, Component, createSignal, Show } from "solid-js";
import s from "./WordSection.module.css";

interface WordToastImports {
    status: Accessor<string>,
}

export const WordToast: Component<WordToastImports> = (props) => {

    return (
        <>
            <Show when={props.status() === "error"}>
            <div class={s.toast} style="background: red;">Not found.</div>
            </Show>
            <Show when={props.status() === "loading"}>
            <div class={s.toast} style="background: #333;">Searching...</div>
            </Show>
        </>
    )
}