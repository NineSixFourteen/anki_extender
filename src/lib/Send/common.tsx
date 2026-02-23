
export async function sendStoredMediaUrl(url:string, fileName:string){
    console.log(`URL : ${url}, FILENAME: ${fileName}`)
    const response = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      body: JSON.stringify({
        action: "storeMediaFile",
        version: 6,
        params: {
          filename: fileName + ".mp3",
          url: url
        }
      })
    });
    return await response.json();
}

export async function sendStoredMediaData(CardStore:any, isAudio:boolean){
      const response = await fetch("http://127.0.0.1:8765", {
        method: "POST",
        body: JSON.stringify({
          action: "storeMediaFile",
          version: 6,
          params: {
            filename: CardStore.TargetWord + (isAudio ? ".mp3": ".jpg"), 
            data: isAudio ? CardStore.Audio : CardStore.Image
          }
        })
      });
    return await response.json();
}


function logAnki(CardStore:any) {
  console.log("Current CardStore Data:", CardStore);
  console.log("Hints:", CardStore.Hints);
  console.log("FrontText: ", CardStore.FrontText)
  console.log("Image: ", CardStore.Image)
  console.log("TargetWord: ", CardStore.TargetWord)
  console.log("Audio: ", CardStore.Audio)
  console.log("English: " + CardStore.English)
}
