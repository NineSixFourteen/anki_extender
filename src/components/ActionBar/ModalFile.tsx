import { createSignal, Show, type Component } from "solid-js";
import './CSS/Modal.css'
import { SelectDelim } from "./SelectDelim";

interface ModalFileImports {
    isModalOpen: Function,
    setIsModalOpen: Function,
    wordStore: string[],
    setWordStore: Function,
    setCurrentWord: Function,

}

const ModalFile: Component<ModalFileImports> = (props) => {
  const [text, setText] = createSignal("");
  const [isDragging, setIsDragging] = createSignal(false);
    const [selectedDelim, setSelectedDelim] = createSignal(",");

    function loadWords(){
      const words = GetWords();
      if(props.wordStore.length == 0 && words.length > 0){
        props.setCurrentWord(words[0]);
      }
      for(const word of words){
          if(word.length != 0) props.setWordStore(props.wordStore.length, word);
      }
        props.setIsModalOpen(false);
    }

    function GetWords(){
      return text().split(selectedDelim());
    }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Check if files exist and get the first one
    const file = e.dataTransfer?.files[0];
    
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target?.result as string);
      };
      reader.readAsText(file);
    } else {
      alert("Please drop a valid .txt file");
    }
  };

  const handleClose = () => {
    props.setIsModalOpen(false);
    setIsDragging(false); // Reset state on close
  };

  const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target?.result as string);
      };
      reader.readAsText(file);
    } else {
      alert("Please select a valid .txt file");
    }
  };
  
  let fileInputRef: HTMLInputElement | undefined;

  return (
    <>

      <Show when={props.isModalOpen()}>
        {/* Backdrop overlay */}
        <div class="modal-overlay" onClick={handleClose}>
          
          {/* Modal Container */}
          <div class="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 class="modal-title">Import Text File</h2>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style="display: none" 
              accept=".txt" 
              onChange={handleFileSelect}
            />

            <div 
              class="drop-zone"
              classList={{ 'dragging': isDragging() }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <Show 
                when={text().length > 0} 
                fallback={
                  <div class="drop-prompt">
                    <p>Drop a .txt file here</p>
                    <button 
                      class="btn-secondary" 
                      style="margin-top: 10px;"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef?.click();
                    }}
                    >
                      Or select file
                    </button>
                  </div>
                }
              >
                <textarea 
                  class="modal-textarea"
                  value={text()} 
                  onInput={(e) => setText(e.currentTarget.value)} 
                />
              </Show>
            </div>

            {/* Bottom Button Row */}
            <div class="modal-actions">
                <div class="leftSide">
                    <SelectDelim selectedDelim={selectedDelim} setSelectedDelim={setSelectedDelim} />
                </div>
              <button class="btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button 
                class="btn-main btn-green" 
                onClick={() => {
                    loadWords()
                  handleClose();
                }}
              >
                Confirm & Load
              </button>
            </div>
          </div>

        </div>
      </Show>
    </>
  );
};

export default ModalFile;