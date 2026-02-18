import { Accessor, Component, createSignal, Show } from "solid-js";



interface ImageSearchImports {
    imageSearch: Function,
    setImageSearch: Function,


}

export const ImageSearch: Component<ImageSearchImports> = (props) => {

    const openSearch = () => {
        const query = props.imageSearch();
        if (query) {
        window.open(
            `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`,
            '_blank',
            'width=1000,height=800'
        );
        }
    };

    return (
      <div class="paneSearch">
        <input 
          id="imgSearch" 
          type="text" 
          value={props.imageSearch()}
          placeholder="Search for image..." 
          onChange={(e) => props.setImageSearch(e.currentTarget.value)}
        />
        <button type="button" class="searchButton" onClick={() => openSearch()}>FIND</button>
      </div>
    )
}