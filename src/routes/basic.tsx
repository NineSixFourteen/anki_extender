import { CardProvider, useCards } from "~/lib/Models/CardContext";
import { StatusProvider } from "~/lib/Models/StatusContext";
import BasicBody from "~/components/BasicBody/BasicBody";

export default function Basic() {
  return (
    <StatusProvider>
        <CardProvider>
            <BasicBody />
        </CardProvider>
    </StatusProvider>
  );
}