import { createSignal, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store'; // Use Store for stable list updates
import { useCards } from '~/lib/Models/CardContext';
import { OptionSearch } from './OptionSearch/OptionSearch';
import { OptionHints } from './OptionsHints/OptionsHints';
import { OptionText } from './OptionsText/OptionsText';

export function OptionSection() {
  const [searchTerm, setSearchTerm] = createSignal("");
  
  const [hints, setHints] = createStore<StupidString[]>([]);
    const { setCardStore } = useCards();
  



  return (
    <div class="column">
      <div class="label">Help</div>

      <OptionSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <OptionHints hints={hints} setHints={setHints}  setCardStore={setCardStore} />
      <OptionText setCardStore={setCardStore} />
      
    </div>
  );
};