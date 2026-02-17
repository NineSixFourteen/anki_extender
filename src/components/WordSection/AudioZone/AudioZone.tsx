import { Accessor, Component, createMemo, createSignal, Show } from "solid-js";
import s from "../WordSection.module.css";
import { WordToast } from "./WordToast";

interface AudioZoneImports {
    status: Accessor<string>,
    searchTerm: Function,
    audioFile: Function,
    setPastedUrl: Function,
    pastedUrl: Function,
    setAudioFile: Function,
    
}


export const AudioZone: Component<AudioZoneImports> = (props) => {

  const activePreviewUrl = createMemo(() => {
    const file = props.audioFile();
    if (file) return URL.createObjectURL(file);
    return (props.pastedUrl().startsWith("http")) ? props.pastedUrl() : "";
  });

    return (
      <div class="zone" tabindex="0">
        <WordToast status={props.status}/>

        <div class={s.audioContainer}>
          <Show when={activePreviewUrl()} fallback={
            <>
              <label class={s.audioLabel}>
                <input type="file" onChange={(e) => props.setAudioFile(e.target.files?.[0] || null)} class={s.hiddenInput} />
              </label>
              <div class={s.divider}>— OR —</div>
              <input 
                type="text" 
                placeholder="Paste link..." 
                class={s.urlInput}
                value={props.pastedUrl()}
                onInput={(e) => props.setPastedUrl(e.currentTarget.value)} 
              />
            </>
          }>
            <div class={s.previewWrapper}>
              <audio controls src={activePreviewUrl()} class={s.audioPreview} />
              <button type="button" class={s.clearBtn} onClick={() => { props.setAudioFile(null); props.setPastedUrl(""); }}>✕ Clear</button>
            </div>
          </Show>
        </div>
      </div>
    )
}