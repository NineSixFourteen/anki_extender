export function updateStatus(field:any, status:number,text:string, setStatusContext:Function){
  setStatusContext("ShowLoading", status === 3)
  setStatusContext("Text",text);
  setStatusContext(field, status);
}

export function handleResponse(result:any, field:string, setStatusContext:Function){
  console.log("Field: " + field + ", isError: " + (result.error ? true : false) + ", Error:" + result.error)
  if (result.error) {
    updateStatus(
      field == 'Image' ? "SendImage" : field == 'Audio' ? 'SendAudio' : 'SendCard', 
      0, 
      "Error: " + result.error,
      setStatusContext
    )
  } else {
    updateStatus(
      field == 'Image' ? "SendImage" : field == 'Audio' ? 'SendAudio' : 'SendCard',
      4,
      "Success: " + field + " saved as "+  result.result,
      setStatusContext
    )
    console.log("Success! " + field + " saved as:", result.result); 
  }
}

export function resetStatusBar(setStatusContext:Function){
  setStatusContext(
    {
      CheckRequest: 1,  
      SendImage : 1, 
      SendAudio: 1, 
      SendCard: 1, 
      ShowLoading: false,
      Text: "Starting" 
    }
  )
}