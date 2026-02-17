import { Accessor, Component, createSignal, Show } from "solid-js";


export const ImageSearch: Component = () => {

    const openSearch = () => {
        const query = (document.getElementById('imgSearch') as HTMLInputElement).value;
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
          placeholder="Search for image..." 
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), openSearch())}
        />
        <button type="button" class="searchButton" onClick={() => openSearch()}>FIND</button>
      </div>
    )
}