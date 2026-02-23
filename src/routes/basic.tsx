import BasicBody from "~/components/BasicBody/BasicBody";
import { CardProvider } from "~/components/BasicBody/lib/CardContext";
import { StatusProvider } from "~/components/Common/LoadingBar/lib/StatusContext";

export default function Basic() {
  return (
    <StatusProvider>
        <CardProvider>
            <BasicBody />
        </CardProvider>
    </StatusProvider>
  );
}