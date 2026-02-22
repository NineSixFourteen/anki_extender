import { json, query } from "@solidjs/router";

export const fetchSentences = query(async (languageCode:String, word:String,wordCount:String) => {
  "use server"; 
    try{
        const baseUrl = "https://api.tatoeba.org/v1/sentences";
        const constOptions = "is_native=yes&has_audio=yes&trans%3Alang=eng&sort=relevance&include=transcriptions%2Caudios";
        const fullUrl = `${baseUrl}?lang=${languageCode}&q=${word}&word_count=${wordCount}&${constOptions}`
        const response = await fetch(
            fullUrl,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Accept": "application/json"
                },
                method: "GET"
            }
        );
        if (!response.ok) {
            return json({ error:fullUrl }, { status: response.status });
        }

        const data = await response.json();
        return json(data); // Send clean JSON back to your frontend
    } catch (err) {
        return json({ error: "Server fetch failed" }, { status: 500 });
    }
}, "tatoeba-search");