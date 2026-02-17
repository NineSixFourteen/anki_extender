import { createStore, SetStoreFunction } from "solid-js/store";
import { createContext, JSX, useContext } from "solid-js";

export interface CardType {
  Image: String ,  
  FrontText: String, 
  Audio: String, 
  TargetWord: String, 
  Hints: StupidString[]
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
        Hints: []
    });

    const cardContext: CardContextValue = {
      CardStore,
      setCardStore
    }

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
