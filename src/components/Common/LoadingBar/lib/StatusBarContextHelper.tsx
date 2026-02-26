const wait = (ms: number) => new Promise(res => setTimeout(res, ms));


export async function updateStatus(field:any, status:number,text:string, setStatusContext:Function, waitTime:number){
  setStatusContext("ShowLoading", status === 3)
  setStatusContext("Text",text);
  setStatusContext(field, status);
  await wait(waitTime);
}

export async function handleResponse(result:any, field:string, setStatusContext:Function){
  if (result.error) {
    await updateStatus(
      field == 'Image' ? "SendImage" : field == 'Audio' ? 'SendAudio' : 'SendCard', 
      0, 
      "Error: " + result.error,
      setStatusContext,
      0
    )
  } else {
    await updateStatus(
      field == 'Image' ? "SendImage" : field == 'Audio' ? 'SendAudio' : 'SendCard',
      4,
      "Success: " + field + " saved as "+  result.result,
      setStatusContext,200
    )
    console.log("Success! " + field + " saved as:", result.result); 
  }
}

export async function handleResponseW(result:any, field:string, setStatusContext:Function, waitTime:number){
  console.log(`field: ${field}, hasError: ${result.error}`)
  if (result.error) {
    await updateStatus(
      field == 'Image' ? "SendImage" : field == 'Audio' ? 'SendAudio' : 'SendCard', 
      0, 
      "Error: " + result.error,
      setStatusContext,
      waitTime
    )
  } else {
    await updateStatus(
      field == 'Image' ? "SendImage" : field == 'Audio' ? 'SendAudio' : 'SendCard',
      4,
      "Success: " + field + " saved as "+  result.result,
      setStatusContext,
      waitTime
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