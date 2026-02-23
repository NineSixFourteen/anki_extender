import { TranslationData } from "./TranslationData";

export interface SentenceData {
    id: number,
    audio: AudioData[],
    lang: string,
    text: string,
    translateions: TranslationData[]
}
