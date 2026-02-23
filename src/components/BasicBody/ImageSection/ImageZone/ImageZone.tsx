import { Accessor, Component, createSignal, Show } from "solid-js";
import s from "../ImageSection.module.css";

interface ImageZoneImports {
    imgData: Function,
    setImgData: Function,
    setCardStore: Function
}

export const ImageZone: Component<ImageZoneImports> = (props) => {

    const handlePaste = (e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (const item of items) {
        if (item.type.includes("image")) {
            const reader = new FileReader();
            let fullDataUrl;
            reader.onload = (event) => {
            fullDataUrl = event.target?.result as string;
            props.setImgData(fullDataUrl);
            props.setCardStore('Image', fullDataUrl.split(',')[1]);
            };
            reader.readAsDataURL(item.getAsFile()!);
        }
        }
    };

    return (
      <div onPaste={(e) => handlePaste(e)} class="zone" tabindex="0">
        <Show 
          when={props.imgData()} 
          fallback={<span class={s.placeholder}>Ctrl+V to Paste Image</span>}
        >
          <div class={s.imageWrapper}>
            <img src={props.imgData()} />
            <button 
              type="button" 
              class={s.clearBtn} 
              onClick={() => props.setImgData("")}
            >
              ✕
            </button>
          </div>
        </Show>
      </div>
    )
}