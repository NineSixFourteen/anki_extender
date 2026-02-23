import { Component, Show } from "solid-js";
import "./Loading.css";
import { useStatusBarInfo } from "~/lib/Models/StatusContext";
import { sendCard } from "~/lib/SendCardPipeline/SendCardPipeline";
import { useCards } from '~/lib/Models/CardContext';
import './StatusBar.css'
import CardCoutner from "./CardCounter/CardCounter";
import { StatusBar } from "../Common/StatusBar/StatusBar";

interface StatusBar2Imports {
    count:Function,
    setCount:Function

}

export const StatusBar2: Component<StatusBar2Imports> = (props) => {

  const { setStatusContext} = useStatusBarInfo();
  const { CardStore} = useCards();



  return (
    <StatusBar send={() => sendCard(setStatusContext, CardStore,props.setCount((count:number) => count + 1))} cardCounter={
      <CardCoutner label={"Total cards sent: "} value={props.count()} />
    } />
  );
}