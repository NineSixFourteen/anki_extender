export function PlusIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="22" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3.5" /* Slightly thicker for a premium feel */
      stroke-linecap="round" /* Rounds the ends of the lines */
      stroke-linejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="12" y1="5" x2="12" y2="19" />
    </svg>
  );
}

export function TickIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="22" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="22" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="3" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

/* Phrases */
export function searchIcon(){
    return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="#333333" stroke-width="2"/>
            <circle cx="21" cy="21" r="6" stroke="#3b82f6" stroke-width="2.5"/>
            <path d="M26 26L32 32" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
    );
}