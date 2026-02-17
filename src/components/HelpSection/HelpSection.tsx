import { createSignal, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store'; // Use Store for stable list updates
import { useCards } from '~/lib/Models/CardContext';
import { HelpSearch } from './HelpSearch/HelpSearch';
import { HelpHints } from './HelpHints/HelpHints';
import { HelpText } from './HelpText/HelpText';

export function HelpSection() {
  const [searchTerm, setSearchTerm] = createSignal("");
  
  const [hints, setHints] = createStore<StupidString[]>([]);
    const { setCardStore } = useCards();
  



  return (
    <div class="column">
      <div class="label">Help</div>

      <HelpSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <HelpHints hints={hints} setHints={setHints}  setCardStore={setCardStore} />
      <HelpText setCardStore={setCardStore} />
      
    </div>
  );
};