'use strict';

// UI Imports
import {h} from 'preact';
import render from 'preact-render-to-string';
// UI Components
import RoutedView from '../../core/routedView.js';
import LoadingView from '../../core/loadingView.js';

function defaultRoute(req, res, next) {  
  const supportsManifest = req.userAgentClassifiction === 'chrome';
  const resources = req.resources;

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Connection': 'Transfer-Encoding',
    'Transfer-Encoding': 'chunked',
    'Strict-Transport-Security': 'max-age=31557600; includeSubDomains; preload',
    'Timing-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*'
  });

  res.write(`<!DOCTYPE html>
    <html>
    <head>
      <title>Preact Hacker News</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0" />
      ${supportsManifest ? '<meta name="theme-color" content="#0077B5" />' : ''}
      <style>${resources.inline}</style>
      ${resources.inline === null && resources.css !== null ? '<link rel="stylesheet" href="' + resources.css + '" />' : ''}
      ${supportsManifest ? '<link rel="manifest" href="dist/chrome/manifest.json" />' : ''}
      <link rel="icon" href="/static/icons/favicon.ico">
    </head>
    <body>
      <div id="mount">`);

  const RoutedViewComponent = render(
    <RoutedView
      url={req.url}
      delay={0}>
      <LoadingView />
    </RoutedView>
  );

  res.write(`
        ${RoutedViewComponent}
        </div>
        <script src="${resources.js}"></script>
      </body>
    </html>`);

    // TODO: More research on why these scripts cannot be loaded async.

  res.end();

  next();
}

module.exports = defaultRoute;
