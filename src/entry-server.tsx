import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {assets}
        </head>
        <body style="background-color: #0A0A0B; margin: 0;">
          <div id="app">
            {/* loading screen  */}
            <div id="loading-overlay">
              <div class="spinner"></div>
              <p style={{ "margin-top": "20px", "font-weight": "500", "letter-spacing": "0.05em" }}>
                  LOADING...
              </p>
          </div>

            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));