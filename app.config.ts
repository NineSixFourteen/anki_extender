import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    runtimeConfig: {
      ankiUrl: "http://127.0.0.1:8765" // This is the default
    }
  }
});