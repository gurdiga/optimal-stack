const testScreen = /** @type {HTMLDivElement} */ (document.getElementById('test-screen'));

/**
 *
 * @param {string} path
 * @returns {Promise<void>}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function loadFixture(path) {
  return loadTemplate(testScreen, path);
}
