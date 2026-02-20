import { Route, Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Navbar } from "./components/Navbar/Navbar";
import Basic from "./routes/basic";
import Home from "./routes";
import Phrases from "./routes/phrases";

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
      <Route path="/phrases" component={Phrases} />
      <Route path="/" component={Home} />
    </Router>
  );
}