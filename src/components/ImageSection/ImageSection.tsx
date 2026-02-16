import { createSignal, Show } from "solid-js";
import s from "./ImageSection.module.css";

export function ImageSection() {
  const [imgData, setImgData] = createSignal("");

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.includes("image")) {
        const reader = new FileReader();
        reader.onload = (event) => setImgData(event.target?.result as string);
        reader.readAsDataURL(item.getAsFile()!);
      }
    }
  };

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
    <div class={s.column}>
      <div class="label">FRONT (IMAGE + EXTRA)</div>
      
      <div class={s.paneSearch}>
        <input 
          id="imgSearch" 
          type="text" 
          placeholder="Search for image..." 
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), openSearch())}
        />
        <button type="button" onClick={openSearch}>FIND</button>
      </div>

      <div onPaste={handlePaste} class={s.pasteZone} tabindex="0">
        <Show 
          when={imgData()} 
          fallback={<span class={s.placeholder}>Ctrl+V to Paste Image</span>}
        >
          <div class={s.imageWrapper}>
            <img src={imgData()} />
            <button 
              type="button" 
              class={s.clearBtn} 
              onClick={() => setImgData("")}
            >
              ✕
            </button>
          </div>
        </Show>
      </div>

      <div class="label" style="background: #111; border-top: 1px solid #2a2a2a; font-size: 0.6rem;">
        FRONT TEXT (OPTIONAL)
      </div>
      <textarea 
        name="frontText" 
        placeholder="Add context to image..." 
        class={s.smallTextarea} 
      />
      
      <input type="hidden" name="frontImage" value={imgData()} />
    </div>
  );
}