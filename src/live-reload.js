if (location.hostname === 'localhost') {
  setupLiveReload();
}

function setupLiveReload() {
  loadScript(document.body, 'http://localhost:35729/livereload.js?snipver=1');
}
