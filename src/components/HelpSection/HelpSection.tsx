import { Component, createSignal, For, onMount, Show } from 'solid-js';
import { createStore } from 'solid-js/store'; 
import { useCards } from '~/lib/Models/CardContext';
import { HelpSearch } from './HelpSearch/HelpSearch';
import { HelpHints } from './HelpHints/HelpHints';
import { HelpText } from './HelpText/HelpText';

interface HelpSectionImports {
  ref: any
}

export const HelpSection: Component<HelpSectionImports> = (props) => {
    
  const [searchTerm, setSearchTerm] = createSignal("");
  
  const [hints, setHints] = createStore<StupidString[]>([]);
  const [englishText, setEnglishText] = createSignal("");
    const { setCardStore } = useCards();
  
  function clearDown(){
    setHints([]);
    setSearchTerm("");
    setEnglishText("");
  }

  onMount(() => {
    props.ref({
      clear: () => clearDown()
    });
  });


  return (
    <div class="column">
      <div class="label">Help</div>

      <HelpSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <HelpHints hints={hints} setHints={setHints}  setCardStore={setCardStore} />
      <HelpText englishText={englishText} setEnglishText={setEnglishText} setCardStore={setCardStore} />
      
    </div>
  );
};