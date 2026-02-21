import { For } from "solid-js";
import './LoadingBar.css'

interface LoadingBarProps {
  status: Number[]; // 0, 1, 2, 3, or 4
}

export default function LoadingBar(props: LoadingBarProps) {
  // Logic to determine color based on status number
  const getSegmentColor = (currentStatus: Number) => {
    if (currentStatus === 0) return "#ef4444"; // Red
    if (currentStatus === 2) return "#fff"
    if (currentStatus === 3) return "#3b82f6"; // Blue
    if (currentStatus === 4) return "#22c55e"; // Green
    return "#333333"; // Default dark
  };

  return (
      <div class="fixed-bottom-container">
        <div class="loading-bar-container">
            <For each={[0, 1, 2, 3]}>
            {(segmentNum) => (
                <div 
                class="bar-segment"
                style={{
                    "background-color": getSegmentColor(props.status[segmentNum]),
                    "border-color":"#333"
                }}
                />
            )}
            </For>
        </div>
    </div>
  );
}