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
    setCardStore: Function,

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
                onInput={async (e) => {
                  if (e.currentTarget.value.startsWith("http://")){
                    const response = fetch(e.currentTarget.value);
                    const reader = new FileReader();
                    reader.onload =async () => {
                      const base64Data = (reader.result as string).split(",")[1];
                      props.setCardStore(base64Data);
                    } 
                  }
                  props.setPastedUrl(e.currentTarget.value);
                }} 
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