/**
 *
 * @param {HTMLElement | ShadowRoot} container
 * @param {[string, Record<string, string>][]} elementTuple
 */
function appendElement(container, elementTuple) {
  elementTuple.forEach(([tagName, attrs]) => {
    const element = document.createElement(tagName);

    for (const attr in attrs) {
      element.setAttribute(attr, attrs[attr]);
    }

    container.appendChild(element);
  });
}

/**
 *
 * @param {HTMLElement | ShadowRoot} container
 * @param {string} src
 */
function loadScript(container, src) {
  appendElement(container, [["script", { src }]]);
}

/**
 *
 * @param {ShadowRoot} shadowRoot
 * @param {string} template
 * @returns Promise<void>
 */
function loadTemplate(shadowRoot, template) {
  return fetch(template)
    .then((response) => response.text())
    .then((html) => {
      shadowRoot.innerHTML = html;

      loadScripts();
    });

  function loadScripts() {
    const selector = "script[src]";
    const attribute = "src";

    shadowRoot.querySelectorAll(selector).forEach((element) => {
      const src = element.getAttribute(attribute)?.trim();

      if (src) {
        loadScript(shadowRoot, src);
      } else {
        console.warn(`Skipping a ${selector} tag with empty "${src}" attribute in ${template}`);
      }
    });
  }
}
