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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // This converts to base64
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

    return (
      <div class="zone" tabindex="0">
        <WordToast status={props.status}/>

        <div class={s.audioContainer}>
          <Show when={activePreviewUrl()} fallback={
            <>
              <label class={s.audioLabel}>
                <input type="file" onChange={async (e) => {
                  props.setAudioFile(e.target.files?.[0] || null);
                  const file = e.target.files?.[0];
                  let base64String;
                  if(file){
                    base64String = await fileToBase64(file);
                    const rawBase64 = base64String.split(',')[1];
                    props.setCardStore("Audio",rawBase64);
                  } 
                }
                }class={s.hiddenInput} />
              </label>
              <div class={s.divider}>— OR —</div>
              <input 
                type="text" 
                placeholder="Paste link..." 
                class={s.urlInput}
                value={props.pastedUrl()}
                onInput={async (e) => {
                  if (e.currentTarget.value.startsWith("http://") || e.currentTarget.value.startsWith("https://") ){
                      props.setCardStore("Audio",e.currentTarget.value);
                  }
                  props.setPastedUrl(e.currentTarget.value);
                }} 
              />
            </>
          }>
            <div class={s.previewWrapper}>
              <audio controls src={activePreviewUrl()} class={s.audioPreview} />
              <button type="button" class={s.clearBtn} onClick={() => { props.setAudioFile(null); props.setPastedUrl(""); props.setCardStore('Audio', '') }}>✕ Clear</button>
            </div>
          </Show>
        </div>
      </div>
    )
}