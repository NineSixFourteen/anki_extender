import { Component, For, JSX} from 'solid-js';
import './ActionBar.css'

interface ActionBarImports {
    leftSide: JSX.Element[],
    rightSide: JSX.Element[]
}

export const ActionBar: Component<ActionBarImports> = (props) => {

  return (
    <div class="actionBar">
      <div class="actionBarInner">
        <div class="toolbar-container">
            <For each={props.leftSide}>
                {(element) => element}
            </For>
          <div class="rightSide">
            <For each={props.rightSide}>
                {(element) => element}
            </For>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ActionBar;