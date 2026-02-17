import { Component } from "solid-js";
import s from "./WordSection.module.css";
import { handleForvo, handleMagicFetch, handleSpanishDict, handleWordReference } from "./api";


interface WordButtonImports {
    searchTerm: Function,
    setStatus: Function,
    setPastedUrl: Function
}

export const WordButtons: Component<WordButtonImports> = (props) => {

    return (
        <div class={s.buttonGroup}>
            <button type="button" onClick={() => handleMagicFetch(props.searchTerm,props.setStatus, props.setPastedUrl)} class={s.magicBtn}>✨</button>
            <button type="button" onClick={() => handleForvo(props.searchTerm)} class={s.forvoBtn}>F</button>
            <button type="button" onClick={() => handleWordReference(props.searchTerm)} class={s.wrBtn}>W</button>
            <button type="button" onClick={() => handleSpanishDict(props.searchTerm)} class={s.sdBtn}>S</button>
        </div>
    )

}