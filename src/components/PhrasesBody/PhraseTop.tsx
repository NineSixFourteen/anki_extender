import { SentenceProvider } from "~/components/PhrasesBody/lib/models/SentencesContext";
import PhrasesBody from "./PhrasesBody";
import { StatusProvider } from "../Common/LoadingBar/lib/StatusContext";

export default function PhrasesTop() {

  return (
    <SentenceProvider>
      <StatusProvider>
        <PhrasesBody />
      </StatusProvider>
      </SentenceProvider>
  )
}