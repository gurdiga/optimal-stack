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
 * @param {HTMLElement | ShadowRoot} container
 * @param {string} href
 */
function loadStylesheet(container, href) {
  appendElement(container, [["link", { href, rel: "stylesheet" }]]);
}

/**
 *
 * @param {ShadowRoot} shadowRoot
 * @param {string} template
 * @param {string} stylesheet
 * @returns Promise<void>
 */
function loadTemplateAndStylesheet(shadowRoot, template, stylesheet) {
  return fetch(template)
    .then((response) => response.text())
    .then((html) => {
      shadowRoot.innerHTML = html;

      loadStylesheet(shadowRoot, stylesheet);

      shadowRoot.querySelectorAll("script[src]").forEach((script) => {
        loadScript(shadowRoot, script.getAttribute("src"));
      });
    });
}
