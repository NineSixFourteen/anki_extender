import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { CardProvider } from "./lib/Models/CardContext";
import { StatusProvider } from "./lib/Models/StatusContext";

export default function App() {
  return (
    <Router
      root={(props) => (
        <StatusProvider>
          <CardProvider>
            <Suspense>{props.children}</Suspense>
          </CardProvider>
         </StatusProvider>

      )}
    >
      <FileRoutes />
    </Router>
  );
}