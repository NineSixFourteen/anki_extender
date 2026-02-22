import { Component, For } from "solid-js";
import './CardPhrase.css'
interface CardPhraseImports {
    SentenceEnglish:string[],
    SentenceSpanish:string,
    audioUrl:string
}



export const CardPhrase: Component<CardPhraseImports> = (props) => {

  return (
        <div class="sentenceCard">
            <div class="word-group">
                <span class="sentence-text" style={"font-size:1.8rem;margin-left:20px"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="60" height="30">
                        <rect width="750" height="500" fill="#c60b1e"/>
                        <rect width="750" height="250" y="125" fill="#ffc400"/>
                        <circle cx="200" cy="250" r="40" fill="#c60b1e" opacity="0.8"/>
                    </svg>

                    {props.SentenceSpanish}</span>
            </div>
            <div class="words-group">
                <For each={props.SentenceEnglish}>
                {(item) => (
                <div style={"display:flex;gap:15px;min-width:200px; padding-left:45px"}>
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
                <button class="action-btn play">play</button>
                <button class="action-btn add">+</button>
            </div>
        </div>
  );
}