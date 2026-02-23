import { Component, createSignal, For, Show } from "solid-js";
import './CardPhrase.css'
import { PhraseInfo, Phrases } from "~/lib/Models/SentencesContext";
import { AddPhraseIcon, PlayAudioIcon, RemovePhraseIcon, SpainIcon, UKIcon } from "~/components/Common/Icons/CardPhase";
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
                    <SpainIcon/>
                    {props.phrase.SentenceSpanish}</span>
            </div>
            <div class="words-group">
                <For each={props.phrase.SentenceEnlgish}>
                {(item) => (
                <div class="english-sec">
                    <UKIcon />
                    <span class="sentence-text">{item}<br/></span>
                </div>
                )}
                </For>
            </div>
            <div class="buttonGroup">
                <button class="action-btn" onClick={() => {
                    PlayAudioButton(props.phrase.audioUrl)
                }}>
                    <PlayAudioIcon />
                </button>
                <Show when={!isSelected()}>
                    <button class="action-btn" onClick={() => {
                            setSelected(true)
                            props.setSelectedWords( (items:Phrases) => {
                                return {"phrases": [...items.phrases, props.phrase]}
                            })
                            }}>
                        <AddPhraseIcon />
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
                    <RemovePhraseIcon/>
                    </button>
                </Show>
            </div>
        </div>
  );
}