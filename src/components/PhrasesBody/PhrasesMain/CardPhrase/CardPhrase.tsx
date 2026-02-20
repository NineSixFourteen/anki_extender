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
            <div class="SpanishCol">
                <span class="sentence-head">Spanish:</span>
                <span class="sentence-text">{props.SentenceSpanish}</span>

            </div>
            <div class="EnglishCol">
                <span class="sentence-head">English</span>
                <For each={props.SentenceEnglish}>
                {(item) => (
                    <span class="sentence-text">{item}</span>
                )}
                </For>
            </div>
            <div class="action-group">
                <button class="action-btn play">play</button>
                <button class="action-btn add">+</button>
            </div>
        </div>
  );
}