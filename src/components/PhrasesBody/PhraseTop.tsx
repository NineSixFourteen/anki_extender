import { SentenceProvider } from "~/lib/Models/SentencesContext";
import PhrasesBody from "./PhrasesBody";
import { StatusProvider } from "~/lib/Models/StatusContext";

export default function PhrasesTop() {

  return (
    <SentenceProvider>
      <StatusProvider>
        <PhrasesBody />
      </StatusProvider>
      </SentenceProvider>
  )
}