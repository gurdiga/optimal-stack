if (location.hostname === 'localhost') {
  setupLiveReload();
}

function setupLiveReload() {
  AppHTMLElement.loadScript(document.body, 'http://localhost:35729/livereload.js?snipver=1');
}
