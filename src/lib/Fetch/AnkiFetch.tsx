export async function fetchAnkiDecks() {
  try{
    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "deckNames",
        version: 6
      })
    });
    const json = await response.json();
    if (json.error) throw new Error(json.error);
    //Cringe sort 
    const decks = json.result as string[];
    return decks.sort((a, b) => {
      if (a === "Default") return -1; // a comes first
      if (b === "Default") return 1;  // b comes first
      return a.localeCompare(b)
    });
  } catch (err) {
    throw new Error("Anki connection refused. Is Anki running?");
  }
}