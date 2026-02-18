import {Component, For, Show } from "solid-js";

interface SelectDeckImports {
    decks: Function,
    setCardStore: Function

}

export const SelectDeck: Component<SelectDeckImports> = (props) => {
    
    return (
        <div class="SelectDeck">
            <label>Target Deck</label>
            <Show when={props.decks()} fallback={<p>Loading Decks...</p>}>
                <select value="Default" onChange={(e) => {
                props.setCardStore("Deck", e.currentTarget.value)
                }}>
                <For each={props.decks()}>
                    {(deckName:string) => (
                    <option value={deckName}>{deckName}</option>
                    )}
                </For>
                </select>
            </Show>
        </div>
    )
}
            
            




