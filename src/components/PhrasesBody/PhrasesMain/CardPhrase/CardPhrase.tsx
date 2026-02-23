import { Component, createSignal, For, Show } from "solid-js";
import './CardPhrase.css'
import { PhraseInfo, Phrases } from "~/lib/Models/SentencesContext";
interface CardPhraseImports {
    phrase:PhraseInfo,
    setSelectedWords:Function,
}

export const CardPhrase: Component<CardPhraseImports> = (props) => {

    const [isSelected, setSelected] = createSignal(false);

    const PlayAudioButton = (url:string) => {
        const audio = new Audio(url);
        audio.play().catch(err => console.error("Audio play failed:", err));
    }

  return (
        <div class={"sentenceCard " + (isSelected() ? "sentenceSelectedCard" : "")}>
            <div class="word-group">
                <span class="sentence-text" style={"font-size:1.8rem;margin-left:20px"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="60" height="30">
                        <rect width="750" height="500" fill="#c60b1e"/>
                        <rect width="750" height="250" y="125" fill="#ffc400"/>
                        <circle cx="200" cy="250" r="40" fill="#c60b1e" opacity="0.8"/>
                    </svg>

                    {props.phrase.SentenceSpanish}</span>
            </div>
            <div class="words-group">
                <For each={props.phrase.SentenceEnlgish}>
                {(item) => (
                <div class="english-sec">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="60" height="30">
                        <clipPath id="s">
                            <path d="M0,0 v30 h60 v-30 z"/>
                        </clipPath>
                        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
                        <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#s)" stroke="#C8102E" stroke-width="4"/>
                        <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
                        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
                    </svg>
                    <span class="sentence-text">{item}<br/></span>
                </div>
                )}
                </For>
            </div>
            <div class="buttonGroup">
                <button class="action-btn" onClick={() => {
                    PlayAudioButton(props.phrase.audioUrl)
                }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="22" stroke="#333333" stroke-width="2"/>
                    
                    <path d="M32 24L19 31.5V16.5L32 24Z" fill="#3b82f6"/>
                    </svg>
                </button>
                <Show when={!isSelected()}>
                    <button class="action-btn" onClick={() => {
                            setSelected(true)
                            props.setSelectedWords( (items:Phrases) => {
                                return {"phrases": [...items.phrases, props.phrase]}
                            })
                            }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="22" stroke="#333333" stroke-width="2"/>
                            
                            <path d="M24 14V34" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
                            <path d="M14 24H34" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </button>
                </Show>
                <Show when={isSelected()}>
                    <button class="action-btn" onClick={() => {
                            setSelected(false)
                            props.setSelectedWords( (items:Phrases) => {
                                return {"phrases": items.phrases.filter(
                                    (item) => item.id != props.phrase.id
                                )}
                            })
                            }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="22" stroke="#333333" stroke-width="2"/>
                            
                            <path d="M17 17L31 31" stroke="#ff4444" stroke-width="3" stroke-linecap="round"/>
                            <path d="M31 17L17 31" stroke="#ff4444" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </button>
                </Show>
            </div>
        </div>
  );
}