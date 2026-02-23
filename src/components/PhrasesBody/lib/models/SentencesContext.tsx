import { createContext, JSX, useContext } from "solid-js"
import { createStore, SetStoreFunction } from "solid-js/store"
import { Phrases } from "./Phrases";


interface PhrasesValue {
    SentenceContext: Phrases,
    setSentenceContext: SetStoreFunction<Phrases>
}

const SentenceContext2 = createContext<PhrasesValue>({} as PhrasesValue);

export function SentenceProvider(props: { children: JSX.Element }) {

    const [SentenceContext, setSentenceContext] = createStore<Phrases>({
        phrases: []
    });

    const Reply: PhrasesValue = {
      SentenceContext,
      setSentenceContext
    }

    return (
        <SentenceContext2.Provider value={Reply}>
        {props.children}
        </SentenceContext2.Provider>
    );
}

export function useSentenceContext() {
  const context = useContext(SentenceContext2)
  if(!context) throw new Error("useCards must be used within cardProvider");
  return context;
}