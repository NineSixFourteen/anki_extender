import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { CardProvider } from "./lib/Models/CardContext";

export default function App() {
  return (
    <Router
      root={(props) => (
        <CardProvider>
          <Suspense>{props.children}</Suspense>
         </CardProvider>

      )}
    >
      <FileRoutes />
    </Router>
  );
}