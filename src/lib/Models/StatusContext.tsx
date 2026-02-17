import { createStore, SetStoreFunction, unwrap } from "solid-js/store";
import { createContext, createEffect, JSX, useContext } from "solid-js";

export interface StatusBarInfo {
  CheckRequest: Number,  
  SendImage : Number, 
  SendAudio: Number, 
  SendCard: Number, 
  ShowLoading: Boolean,
  Text: String
};

interface StatusBarInfoValue {
    StatusContext: StatusBarInfo,
    setStatusContext: SetStoreFunction<StatusBarInfo>
}

const StatusContext2 = createContext<StatusBarInfoValue>({} as StatusBarInfoValue);


export function StatusProvider(props: { children: JSX.Element }) {

    const [StatusContext, setStatusContext] = createStore<StatusBarInfo>({
        CheckRequest: 1,  
        SendImage : 1, 
        SendAudio: 1, 
        SendCard: 1, 
        ShowLoading: false,
        Text: "Press send when ready" 
    });

    const statusBarContext: StatusBarInfoValue = {
      StatusContext,
      setStatusContext
    }

    return (
        <StatusContext2.Provider value={statusBarContext}>
        {props.children}
        </StatusContext2.Provider>
    );
}

export function useStatusBarInfo() {
  const context = useContext(StatusContext2)
  if(!context) throw new Error("useCards must be used within cardProvider");
  return context;
}