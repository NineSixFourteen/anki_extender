export function PlusIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3.5" /* Slightly thicker for a premium feel */
      stroke-linecap="round" /* Rounds the ends of the lines */
      stroke-linejoin="round"
    >
      {/* Horizontal line */}
      <line x1="5" y1="12" x2="19" y2="12" />
      {/* Vertical line */}
      <line x1="12" y1="5" x2="12" y2="19" />
    </svg>
  );
}

export function TickIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      {/* Short stroke then long stroke for a balanced checkmark */}
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      {/* Bin Body */}
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      {/* Bin Lid Handle */}
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
