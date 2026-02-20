import { Route, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { lazy, onMount, Suspense } from "solid-js";
import "./app.css";
import { Navbar } from "./components/Navbar/Navbar";
import Basic from "./routes/Basic";
import Home from "./routes";
import Phrases from "./routes/Phrases"

export default function App() {


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
      <Route path="/pharses" component={Phrases} />
      <Route path="/" component={Home} />
    </Router>
  );
}