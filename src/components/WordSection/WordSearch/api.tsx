
export const handleForvo = (searchTerm: Function) => {
    if (searchTerm()) window.open(`https://forvo.com/word/${encodeURIComponent(searchTerm())}/#es`, '_blank');
  };

export  const handleWordReference = (searchTerm: Function) => {
    if (searchTerm()) window.open(`https://www.wordreference.com/es/en/translation.asp?spen=${encodeURIComponent(searchTerm())}`, '_blank');
  };

export const handleSpanishDict = (searchTerm: Function) => {
    if (searchTerm()) window.open(`https://www.spanishdict.com/translate/${encodeURIComponent(searchTerm())}`, '_blank');
  };
  
export const handleMagicFetch = async (searchTerm: Function, setStatus: Function, setPastedUrl: Function) => {
  const word = searchTerm().toLowerCase().trim();
  if (!word) return;

  setStatus("loading");
  try {
    // Switching to a more robust proxy service
    const proxy = "https://corsproxy.io/?";
    const target = `https://www.wordreference.com/es/en/translation.asp?spen=${encodeURIComponent(word)}`;
    
    const response = await fetch(`${proxy}${target}`);
    
    if (!response.ok) throw new Error("Proxy response failed");
    
    const html = await response.text();

    // The Regex hunt for that MP3 path
    const match = html.match(/\/audio\/es\/\w+\/es\d+\.mp3/i);

    if (match) {
      const fullUrl = `https://www.wordreference.com${match[0]}`;
      setPastedUrl(fullUrl);
      setStatus(""); // Success!
    } else {
      throw new Error("ID not found in page");
    }
  } catch (e) {
    console.error("Fetch failed:", e);
    setStatus("error"); // This triggers your corner notification
    setTimeout(() => setStatus(""), 3000);
  }
};