import { Component, For } from "solid-js";

interface CardTopImports {
}

export const CardTop: Component<CardTopImports> = (props) => {

  return (
        <div class="sentenceTop">
            <span class="sentence-head">Target</span>
            <span class="sentence-head">Translations</span>
            <span class="sentence-head">Actions</span>
        </div>
  );
}