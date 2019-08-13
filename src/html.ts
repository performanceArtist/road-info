const html = (reactDom: any, reduxState: any, helmetData: any) => {
  const reduxScript = `<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(reduxState).replace(
    /</g,
    '\\u003c'
  )}
  </script>`;

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
        ${helmetData.title.toString()}
        ${helmetData.meta.toString()}
      </meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="main.css" />
    </head>
    <body>
      <div class="wrapper">${reactDom}</div>
      ${reduxState && reduxScript}
      <script type="text/javascript" src="main.js"></script>
    </body>
  </html>
  `;
};

export default html;
