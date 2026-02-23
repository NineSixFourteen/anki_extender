import { Accessor, Component, createSignal, Show } from "solid-js";

interface HelpSearchhImports {
    searchTerm: Function,
    setSearchTerm: Function
}

export const HelpSearch: Component<HelpSearchhImports> = (props) => {
    
      const exampleSentences = () => {
        if (props.searchTerm()) {
        window.open(`https://tatoeba.org/en/sentences/search?from=spa&query=${encodeURIComponent(props.searchTerm())}&to=eng`, '_blank');
        }
    };

    return (
        <div class="paneSearch">
            <input 
            id="imgSearch" 
            type="text" 
            placeholder="Search for example sentences..."
            value={props.searchTerm()} 
            onInput={(e) => props.setSearchTerm(e.currentTarget.value)}
            />
            <button class="searchButton" onClick={exampleSentences} type="button">FIND</button>
      </div>
    )
}