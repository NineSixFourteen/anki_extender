import { Route, Router } from "@solidjs/router";
import { onMount, Suspense } from "solid-js";
import "./app.css";
import { Navbar } from "./components/Common/Navbar/Navbar";
import Basic from "./routes/basic";
import Home from "./routes";
import Phrases from "./routes/phrases";

export default function App() {

  /* Turn off lading screen*/
    onMount(() => {
        const loader = document.getElementById('loading-overlay');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 800);
        }
    });

  return (
    <Router
      root={(props) => (
        <>
            <Navbar />
            <Suspense >
              {props.children}
            </Suspense>
        </>

      )}
    >
      <Route path="/basic" component={Basic} />
      <Route path="/phrases" component={Phrases} />
      <Route path="/" component={Home} />
    </Router>
  );
}