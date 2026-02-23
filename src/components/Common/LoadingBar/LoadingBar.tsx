import { For } from "solid-js";
import './LoadingBar.css'
import { useStatusBarInfo } from "./lib/StatusContext"


interface LoadingBarProps {
}

export default function LoadingBar(props: LoadingBarProps) {

  const { StatusContext} = useStatusBarInfo();


  const getSegmentColor = (currentStatus: Number) => {
    if (currentStatus === 0) return "#ef4444"; 
    if (currentStatus === 2) return "#fff"
    if (currentStatus === 3) return "#3b82f6"; 
    if (currentStatus === 4) return "#22c55e";
    return "#333333"; // Default dark
  };

  const status = (i:number) => {
    switch (i) {
      case 0: return StatusContext.CheckRequest
      case 1: return StatusContext.SendImage
      case 2: return StatusContext.SendAudio
      case 3: return StatusContext.SendCard
      default:
        return StatusContext.CheckRequest
    }
  }

  return (
      <div class="fixed-bottom-container">
        <div class="loading-bar-container">
            <For each={[0, 1, 2, 3]}>
            {(segmentNum) => (
                <div 
                class="bar-segment"
                style={{
                    "background-color": getSegmentColor(status(segmentNum)),
                    "border-color":"#333"
                }}
                />
            )}
            </For>
        </div>
    </div>
  );
}