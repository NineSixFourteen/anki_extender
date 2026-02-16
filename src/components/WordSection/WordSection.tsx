import { createSignal, createMemo, Show } from "solid-js";
import s from "./WordSection.module.css";
export function WordSection() {
  const [audioFile, setAudioFile] = createSignal<File | null>(null);
  const [pastedUrl, setPastedUrl] = createSignal("");
  const [searchTerm, setSearchTerm] = createSignal("");
  const [status, setStatus] = createSignal(""); // Tracks loading/error for the ✨ button

  const handleForvo = () => {
    if (searchTerm()) window.open(`https://forvo.com/word/${encodeURIComponent(searchTerm())}/#es`, '_blank');
  };

  const handleWordReference = () => {
    if (searchTerm()) window.open(`https://www.wordreference.com/es/en/translation.asp?spen=${encodeURIComponent(searchTerm())}`, '_blank');
  };

  const handleSpanishDict = () => {
    if (searchTerm()) window.open(`https://www.spanishdict.com/translate/${encodeURIComponent(searchTerm())}`, '_blank');
  };
const handleMagicFetch = async () => {
  const word = searchTerm().toLowerCase().trim();
  if (!word) return;

  setStatus("loading");
  try {
    // Switching to a more robust proxy service
    const proxy = "https://corsproxy.io/?";
    const target = `https://www.wordreference.com/es/en/translation.asp?spen=${encodeURIComponent(word)}`;
    
    const response = await fetch(`${proxy}${target}`);
    
    if (!response.ok) throw new Error("Proxy response failed");
    
    const html = await response.text();

    // The Regex hunt for that MP3 path
    const match = html.match(/\/audio\/es\/\w+\/es\d+\.mp3/i);

    if (match) {
      const fullUrl = `https://www.wordreference.com${match[0]}`;
      setPastedUrl(fullUrl);
      setStatus(""); // Success!
    } else {
      throw new Error("ID not found in page");
    }
  } catch (e) {
    console.error("Fetch failed:", e);
    setStatus("error"); // This triggers your corner notification
    setTimeout(() => setStatus(""), 3000);
  }
};

  const activePreviewUrl = createMemo(() => {
    const file = audioFile();
    if (file) return URL.createObjectURL(file);
    return (pastedUrl().startsWith("http")) ? pastedUrl() : "";
  });

  return (
    <div class={s.column}>
      <div class="label">AUDIO SEARCH</div>
      
      <div class={s.paneSearch}>
        <input 
          type="text" 
          placeholder="Type word..." 
          onInput={(e) => setSearchTerm(e.currentTarget.value)}
        />
        <div class={s.buttonGroup}>
          <button type="button" onClick={handleMagicFetch} class={s.magicBtn}>✨</button>
          <button type="button" onClick={handleForvo} class={s.forvoBtn}>F</button>
          <button type="button" onClick={handleWordReference} class={s.wrBtn}>W</button>
          <button type="button" onClick={handleSpanishDict} class={s.sdBtn}>S</button>
        </div>
      </div>

      <div class={s.audioZone} tabindex="0">
        {/* Status Toast Notification */}
        <Show when={status() === "error"}>
          <div class={s.toast}>Not found. Opening WordReference...</div>
        </Show>
        <Show when={status() === "loading"}>
          <div class={s.toast} style="background: #333;">Searching...</div>
        </Show>

        <div class={s.audioContainer}>
          <Show when={activePreviewUrl()} fallback={
            <>
              <label class={s.audioLabel}>
                <input type="file" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} class={s.hiddenInput} />
                <span>Drag MP3 here...</span>
              </label>
              <div class={s.divider}>— OR —</div>
              <input 
                type="text" 
                placeholder="Paste link..." 
                class={s.urlInput}
                value={pastedUrl()}
                onInput={(e) => setPastedUrl(e.currentTarget.value)} 
              />
            </>
          }>
            <div class={s.previewWrapper}>
              <audio controls src={activePreviewUrl()} class={s.audioPreview} />
              <button type="button" class={s.clearBtn} onClick={() => { setAudioFile(null); setPastedUrl(""); }}>✕ Clear</button>
            </div>
          </Show>
        </div>
      </div>

      <div class="label" style="background: #111; border-top: 1px solid #2a2a2a; font-size: 0.6rem;">TARGET WORD</div>
      <textarea name="back" class={s.smallTextarea} placeholder="Type word..." required />
    </div>
  );
}