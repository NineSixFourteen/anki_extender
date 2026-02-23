# Anki_Extender

Anki_Extender is a web app built with **SolidJS**, to speed up the creation of Anki flashcards for learning spanish. 

---

## 💩 Features

### Basic Card Webpage
Used for creating basic 1 or 2 word cards

* **Target Word:** The word in spanish
* **Visual Context (Images):**
    * Grab images from google images via popup
    * Local **Filesystem** uploads.
* **Native Audio Integration:** Audio <br>
    Magic button usually works if one word and in the to-form or is a noun otherwise buttons to quicly search
    * **Forvo** / **SpanishDict** / **WordReference**
    * Local **Filesystem** (MP3/WAV).
* **Contextual Hints:**
    * Can add up to **4 hints**.
    * **Translation** field.

### Phrase Mode
Used for quickly grabbing a bunch of sentences that contain a certian words you are trying to learn.

* **Sentence Audio:** Sourced from **Tatoeba**.
* **Text Support:** Has a **Transcript** of the audio.
* **Nuance Mapping:** Has **Multiple English Translations** sometimes other times just one. 

---

## Tech Stack

Basic SolidJS app

* **Framework:** [SolidJS](https://www.solidjs.com/).
* **Language:** TypeScript / TSX.
* **Styling:** darkmode mostly.

---

## Basic Info

### Prerequisites
* **Node.js**
* **Anki** (with [AnkiConnect](https://ankiweb.net/shared/info/2055492159) to get a rest-api)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone (the git)  
    cd Anki_Extender
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

