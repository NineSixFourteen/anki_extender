import { createStore, SetStoreFunction, unwrap } from "solid-js/store";
import { createContext, createEffect, JSX, useContext } from "solid-js";

export interface CardType {
  Image: String ,  
  FrontText: String, 
  Audio: String, 
  TargetWord: String, 
  Hints: StupidString[],
  English: String
};

interface CardContextValue {
    CardStore: CardType,
    setCardStore: SetStoreFunction<CardType>
}

const CardContext = createContext<CardContextValue>({} as CardContextValue);


export function CardProvider(props: { children: JSX.Element }) {

    const [CardStore, setCardStore] = createStore<CardType>({
        Image: "" ,  
        FrontText: "", 
        Audio: "", 
        TargetWord: "", 
        Hints: [], 
        English: ""
    });

    const cardContext: CardContextValue = {
      CardStore,
      setCardStore
    }

    createEffect(() => {
      const currentHints = CardStore.Hints;
      
      console.log("Hints changed to:", unwrap(currentHints));
    })

  return (
    <CardContext.Provider value={cardContext}>
      {props.children}
    </CardContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardContext)
  if(!context) throw new Error("useCards must be used within cardProvider");
  return context;
}
