import { action } from "@solidjs/router";

export const addToAnki = action(async (formData: FormData) => {
  "use server";
  
  const backText = formData.get("back")?.toString() || "";
const audioFile = formData.get("audioFile") as File;
const audioUrl = formData.get("audioUrl")?.toString();

let audioData: { url: string; filename: string; fields: string[]; }[] = [];

if (audioFile && audioFile.size > 0) {
  // Logic for the uploaded file
} else if (audioUrl && audioUrl.startsWith('http')) {
  // If no file was dropped, use the link instead!
  audioData = [{
    url: audioUrl,
    filename: `forvo_${Date.now()}.mp3`,
    fields: ["Back"]
  }];
}
  
  const res = await fetch("http://127.0.0.1:8765", {
    method: "POST",
    body: JSON.stringify({
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName: formData.get("deckName"),
          modelName: "Basic",
          fields: {
            Front: formData.get("frontContent"), // Build this as we did before
            Back: backText,
            English: formData.get("english")
          },
          audio: audioData || [] // If no audio, send empty array
        }
      }
    })
  });
});