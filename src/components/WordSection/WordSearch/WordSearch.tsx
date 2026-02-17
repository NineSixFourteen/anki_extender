import { Component } from "solid-js";
import { WordButtons } from "./WordButtons";

interface WordSearchImports {
    setSearchTerm: Function,
    searchTerm: Function,
    setStatus: Function,
    setPastedUrl: Function,
    setCardStore: Function
}

export const WordSearch: Component<WordSearchImports> = (props) => {

    return (
      <div class="paneSearch">
        <input 
          type="text" 
          placeholder="Type word..." 
          onInput={(e) => props.setSearchTerm(e.currentTarget.value)}
        />
        <WordButtons searchTerm={props.searchTerm}  setStatus={props.setStatus} setPastedUrl={props.setPastedUrl} setCardStore={props.setCardStore} />
      </div>
    )
}