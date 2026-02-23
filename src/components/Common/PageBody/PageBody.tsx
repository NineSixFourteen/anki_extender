import { Component, For, JSXElement } from "solid-js";
import LoadingBar from "~/components/Common/LoadingBar/LoadingBar";

interface PageBodyImports {
    actionBar:JSXElement,
    mainBody:JSXElement[],
    statusBar:JSXElement

}

export const PageBody: Component<PageBodyImports> = (props) => {
  return (
    <main class="pb-24">
        {props.actionBar}
        <div class="main-wrapper">
            <For each={props.mainBody}>
                {(element) => element}
            </For>
        </div>
        <LoadingBar />
        {props.statusBar}
    </main>
  );
}