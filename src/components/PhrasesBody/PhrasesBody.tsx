import { For } from "solid-js";
import './PhrasesBody.css'
import ActionBar from "./ActionBar/ActionBar";
import PhrasesMain from "./PhrasesMain/PhrasesMain";
import { StatusBar } from "../StatusBar/StatusBar";

export default function PhrasesBody() {

  return (
    <main class="pb-24">
    <ActionBar />
    <PhrasesMain />
    </main>
  );
}