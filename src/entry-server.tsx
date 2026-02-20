import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
          <style>
            {`
              /* Dark Mode Loading Screen Styles */
              #loading-overlay {
                position: fixed;
                inset: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #121212; /* Deep Dark Background */
                z-index: 9999;
                transition: opacity 0.8s ease;
                color: #e0e0e0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              }

              .spinner {
                width: 48px;
                height: 48px;
                border: 4px solid rgba(255, 255, 255, 0.1);
                border-left-color: #4f46e5; /* Indigo accent color */
                border-radius: 50%;
                animation: spin 1s linear infinite;
              }

              @keyframes spin {
                to { transform: rotate(360deg); }
              }

              /* Class to trigger the fade out */
              .fade-out {
                opacity: 0;
                pointer-events: none;
              }

              /* Ensure the body background matches to prevent white flashes */
              body {
                background-color: #121212;
                margin: 0;
              }
            `}
          </style>
        </head>
        <body>
          <div id="app">
            <div id="loading-overlay">
              <div class="spinner"></div>
              <p style="margin-top: 20px; font-weight: 500; letter-spacing: 0.05em;">
                LOADING...
              </p>
            </div>
            {children}
          </div>
          {scripts}
          
          {/* Logic to hide the overlay once hydrated */}
          <script>
            {`
              window.addEventListener('load', () => {
                const loader = document.getElementById('loading-overlay');
                if (loader) {
                  loader.classList.add('fade-out');
                  // Remove from DOM after transition completes
                  setTimeout(() => loader.remove(), 800);
                }
              });
            `}
          </script>
        </body>
      </html>
    )}
  />
));