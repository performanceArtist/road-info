type Args = {
  reactDom: any;
  bundle: string;
  reduxState?: any;
  helmetData?: any;
};

const render = ({ reactDom, reduxState, helmetData, bundle }: Args) => {
  const reduxScript = reduxState
    ? `<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(reduxState).replace(
    /</g,
    '\\u003c'
  )}
  </script>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
        ${helmetData.title.toString()}
        ${helmetData.meta.toString()}
      </meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="commons.css" />
      <link rel="stylesheet" type="text/css" href="${bundle}.css" />
    </head>
    <body>
      <div class="wrapper">${reactDom}</div>
      ${reduxScript}
      <script type="text/javascript" src="commons.js"></script>
      <script type="text/javascript" src="${bundle}.js"></script>
    </body>
  </html>
  `;
};

export default render;
